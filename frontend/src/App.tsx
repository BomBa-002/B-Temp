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

/** Renders the task workspace and diagnostic controls. */
export function App() {
  const { t, i18n } = useTranslation();
  const { data: tasks = [], error, isLoading, mutate } = useSWR<Task[]>('tasks', tasksApi.list);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [actionError, setActionError] = useState('');
  const [diagnostic, setDiagnostic] = useState('');

  const visibleTasks = useMemo(() => tasks.filter((task) => filter === 'all' || (filter === 'active' ? !task.completed : task.completed)), [tasks, filter]);
  const activeCount = tasks.filter((task) => !task.completed).length;

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setActionError('');
    try { await tasksApi.create(title); setTitle(''); await mutate(); } catch (requestError) { setActionError(requestError instanceof Error ? requestError.message : 'Request failed'); }
  }

  async function toggleTask(task: Task) {
    try { await tasksApi.update(task.id, { completed: !task.completed }); await mutate(); } catch (requestError) { setActionError(requestError instanceof Error ? requestError.message : 'Request failed'); }
  }

  async function removeTask(task: Task) {
    try { await tasksApi.remove(task.id); await mutate(); } catch (requestError) { setActionError(requestError instanceof Error ? requestError.message : 'Request failed'); }
  }

  async function runDiagnostic(kind: 'health' | 'database') {
    try { const result = kind === 'health' ? await tasksApi.health() : await tasksApi.database(); setDiagnostic(JSON.stringify(result)); } catch (requestError) { setDiagnostic(requestError instanceof Error ? requestError.message : 'Request failed'); }
  }

  return (
    <main className="shell">
      <section className="app-card" aria-labelledby="page-title">
        <header className="hero">
          <div className="brand-mark" aria-hidden="true">B</div>
          <div><p className="eyebrow">{t('brand')}</p><h1 id="page-title">{t('title')}</h1><p className="subtitle">{t('subtitle')}</p></div>
          <div className="hero-actions"><button className="language" type="button" onClick={() => void setLanguage(i18n.language === 'en' ? 'ar' : 'en')}>{t('language')}</button><div className="status-pill"><span className="status-dot" />{t('online')}</div></div>
        </header>

        <form className="composer" onSubmit={addTask}>
          <label className="sr-only" htmlFor="task-title">{t('newTask')}</label>
          <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder={t('newTask')} maxLength={200} />
          <button type="submit">{t('add')} <span aria-hidden="true">+</span></button>
        </form>

        <div className="toolbar"><div><strong>{activeCount}</strong> {t('active')} {activeCount === 1 ? t('task') : t('tasks')}</div><div className="filters" role="group" aria-label="Filter tasks">{(['all', 'active', 'completed'] as const).map((option) => <button key={option} className={filter === option ? 'filter active' : 'filter'} onClick={() => setFilter(option)} type="button">{t(option)}</button>)}</div></div>
        <div className="diagnostics"><button type="button" onClick={() => void runDiagnostic('health')}>{t('testApi')}</button><button type="button" onClick={() => void runDiagnostic('database')}>{t('testDb')}</button>{diagnostic && <code>{diagnostic}</code>}</div>
        {actionError && <p className="error" role="alert">{actionError}</p>}
        {isLoading && <p className="empty-state">{t('loading')}</p>}
        {error && <p className="empty-state error" role="alert">{t('apiError')}</p>}
        {!isLoading && !error && visibleTasks.length === 0 && <p className="empty-state">{t('empty')}</p>}
        <ul className="task-list" aria-live="polite">{visibleTasks.map((task) => <li className={task.completed ? 'task completed' : 'task'} key={task.id}><button className="check" type="button" aria-label={task.completed ? t('markActive', { title: task.title }) : t('complete', { title: task.title })} onClick={() => void toggleTask(task)}>{task.completed ? '✓' : ''}</button><span className="task-title">{task.title}</span><button className="delete" type="button" aria-label={`${t('delete')} ${task.title}`} onClick={() => void removeTask(task)}>{t('delete')}</button></li>)}</ul>
        <footer className="footer"><span>{t('local')}</span><span>BUILD 0.2</span></footer>
      </section>
    </main>
  );
}
