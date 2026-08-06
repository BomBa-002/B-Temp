/**
 * Main task workspace UI.
 * @module App
 */
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/i18n/index.js';
import { tasksApi, type Task } from '@/services/api.service.js';

type Filter = 'all' | 'active' | 'completed';

function requestMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Request failed';
}

/** Renders the task workspace and diagnostic controls. */
export function App() {
  const { t, i18n } = useTranslation();
  const { data: tasks = [], error, isLoading, mutate } = useSWR<Task[]>('tasks', tasksApi.list);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [diagnostic, setDiagnostic] = useState('');

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return tasks.filter((task) => {
      const matchesFilter = filter === 'all' || (filter === 'active' ? !task.completed : task.completed);
      return matchesFilter && (!query || task.title.toLocaleLowerCase().includes(query));
    });
  }, [tasks, filter, search]);
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextTitle = title.trim();
    if (!nextTitle || submitting) return;
    setSubmitting(true);
    setActionError('');
    try { await tasksApi.create(nextTitle); setTitle(''); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setSubmitting(false); }
  }

  async function toggleTask(task: Task) {
    setBusyId(task.id); setActionError('');
    try { await tasksApi.update(task.id, { completed: !task.completed }); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setBusyId(null); }
  }

  async function saveTask(task: Task) {
    const nextTitle = editingTitle.trim();
    if (!nextTitle) return;
    setBusyId(task.id); setActionError('');
    try { await tasksApi.update(task.id, { title: nextTitle }); setEditingId(null); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setBusyId(null); }
  }

  async function removeTask(task: Task) {
    if (!window.confirm(t('confirmDelete', { title: task.title }))) return;
    setBusyId(task.id); setActionError('');
    try { await tasksApi.remove(task.id); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setBusyId(null); }
  }

  async function runDiagnostic(kind: 'health' | 'database') {
    setDiagnostic(t('checking'));
    try { const result = kind === 'health' ? await tasksApi.health() : await tasksApi.database(); setDiagnostic(JSON.stringify(result)); } catch (requestError) { setDiagnostic(requestMessage(requestError)); }
  }

  return (
    <main className="shell">
      <section className="app-card" aria-labelledby="page-title">
        <header className="hero">
          <div className="brand-mark" aria-hidden="true">B</div>
          <div className="hero-copy"><p className="eyebrow">{t('brand')}</p><h1 id="page-title">{t('title')}</h1><p className="subtitle">{t('subtitle')}</p></div>
          <div className="hero-actions"><button className="language" type="button" onClick={() => void setLanguage(i18n.language === 'en' ? 'ar' : 'en')}>{t('language')}</button><div className="status-pill"><span className="status-dot" />{t('online')}</div></div>
        </header>

        <form className="composer" onSubmit={addTask}>
          <label className="sr-only" htmlFor="task-title">{t('newTask')}</label>
          <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('newTask')} maxLength={200} disabled={submitting} />
          <button type="submit" disabled={submitting || !title.trim()}>{submitting ? t('saving') : t('add')} <span aria-hidden="true">+</span></button>
        </form>

        <div className="toolbar">
          <div className="summary"><strong>{activeCount}</strong> {t('active')}<span className="summary-separator">/</span><strong>{completedCount}</strong> {t('completed')}</div>
          <div className="filters" role="group" aria-label={t('filterTasks')}>{(['all', 'active', 'completed'] as const).map((option) => <button key={option} className={filter === option ? 'filter active' : 'filter'} onClick={() => setFilter(option)} type="button">{t(option)}</button>)}</div>
        </div>
        <div className="search-row"><label className="sr-only" htmlFor="task-search">{t('search')}</label><input id="task-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('search')} /><span>{visibleTasks.length} / {tasks.length}</span></div>
        <div className="diagnostics"><button type="button" onClick={() => void runDiagnostic('health')}>{t('testApi')}</button><button type="button" onClick={() => void runDiagnostic('database')}>{t('testDb')}</button>{diagnostic && <code role="status">{diagnostic}</code>}</div>
        {actionError && <p className="error" role="alert">{actionError}</p>}
        {isLoading && <p className="empty-state" role="status">{t('loading')}</p>}
        {error && <p className="empty-state error" role="alert">{t('apiError')}</p>}
        {!isLoading && !error && visibleTasks.length === 0 && <p className="empty-state">{search ? t('noResults') : t('empty')}</p>}
        <ul className="task-list" aria-live="polite">
          {visibleTasks.map((task) => <li className={task.completed ? 'task completed' : 'task'} key={task.id}>
            <button className="check" type="button" disabled={busyId === task.id} aria-label={task.completed ? t('markActive', { title: task.title }) : t('complete', { title: task.title })} onClick={() => void toggleTask(task)}>{task.completed ? '✓' : ''}</button>
            {editingId === task.id ? <form className="edit-form" onSubmit={(event) => { event.preventDefault(); void saveTask(task); }}><label className="sr-only" htmlFor={`edit-${task.id}`}>{t('edit')}</label><input id={`edit-${task.id}`} value={editingTitle} onChange={(event) => setEditingTitle(event.target.value)} maxLength={200} autoFocus /><button type="submit" disabled={busyId === task.id}>{t('save')}</button><button type="button" onClick={() => setEditingId(null)}>{t('cancel')}</button></form> : <span className="task-title">{task.title}</span>}
            {editingId !== task.id && <div className="task-actions"><button className="edit" type="button" disabled={busyId === task.id} onClick={() => { setEditingId(task.id); setEditingTitle(task.title); }}>{t('edit')}</button><button className="delete" type="button" disabled={busyId === task.id} aria-label={`${t('delete')} ${task.title}`} onClick={() => void removeTask(task)}>{t('delete')}</button></div>}
          </li>)}
        </ul>
        <footer className="footer"><span>{t('local')}</span><span>BUILD 0.3</span></footer>
      </section>
    </main>
  );
}
