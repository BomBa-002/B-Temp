import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/i18n/index.js';
import { tasksApi, type Task } from '@/services/api.service.js';
import { Icon } from '@/components/Icon.js';
import { SmartInput } from '@/components/SmartInput.js';

type Filter = 'all' | 'active' | 'completed';
type Theme = 'light' | 'dark';
type Section = 'dashboard' | 'tasks' | 'reports' | 'settings';

function requestMessage(error: unknown) { return error instanceof Error ? error.message : 'Request failed'; }

export function App() {
  const { t, i18n } = useTranslation();
  const { data: tasks = [], error, isLoading, mutate } = useSWR<Task[]>('tasks', tasksApi.list);
  const [title, setTitle] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark');
  const [section, setSection] = useState<Section>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [diagnostic, setDiagnostic] = useState('');
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => { const timer = window.setInterval(() => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 30000); return () => window.clearInterval(timer); }, []);

  const visibleTasks = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return tasks.filter((task) => {
      const matchesFilter = filter === 'all' || (filter === 'active' ? !task.completed : task.completed);
      return matchesFilter && (!query || task.title.toLocaleLowerCase().includes(query));
    });
  }, [tasks, filter, search]);
  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.length - activeCount;

  async function addTask(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault(); const nextTitle = title.trim(); if (!nextTitle || submitting) return;
    setSubmitting(true); setActionError('');
    try { await tasksApi.create(nextTitle); setTitle(''); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setSubmitting(false); }
  }
  async function toggleTask(task: Task) { setBusyId(task.id); setActionError(''); try { await tasksApi.update(task.id, { completed: !task.completed }); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setBusyId(null); } }
  async function saveTask(task: Task) { const nextTitle = editingTitle.trim(); if (!nextTitle) return; setBusyId(task.id); setActionError(''); try { await tasksApi.update(task.id, { title: nextTitle }); setEditingId(null); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setBusyId(null); } }
  async function removeTask(task: Task) { if (!window.confirm(t('confirmDelete', { title: task.title }))) return; setBusyId(task.id); setActionError(''); try { await tasksApi.remove(task.id); await mutate(); } catch (requestError) { setActionError(requestMessage(requestError)); } finally { setBusyId(null); } }
  async function runDiagnostic(kind: 'health' | 'database') { setDiagnostic(t('checking')); try { const result = kind === 'health' ? await tasksApi.health() : await tasksApi.database(); setDiagnostic(JSON.stringify(result)); } catch (requestError) { setDiagnostic(requestMessage(requestError)); } }
  function navigate(next: Section) { setSection(next); setDrawerOpen(false); }

  const nav = [{ key: 'dashboard' as const, label: t('navDashboard'), icon: 'grid' as const }, { key: 'tasks' as const, label: t('navTasks'), icon: 'list' as const }, { key: 'reports' as const, label: t('navReports'), icon: 'chart' as const }, { key: 'settings' as const, label: t('navSettings'), icon: 'user' as const }];

  return <div id="app" className="app-shell">
    <header className="titlebar">
      <div className="titlebar-brand"><span className="brand-mono">B</span><span className="brand-name">{t('brandName')}</span></div>
      <button className="icon-btn hamburger" type="button" aria-label={t('openMenu')} onClick={() => setDrawerOpen(true)}><Icon name="menu" /></button>
      <div className="titlebar-center">{t('portal')}</div>
      <div className="titlebar-end"><button className="icon-btn" type="button" aria-label={t('toggleTheme')} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button><button className="icon-btn" type="button" aria-label={t('language')} onClick={() => void setLanguage(i18n.language === 'en' ? 'ar' : 'en')}><Icon name="globe" /></button></div>
    </header>
    <div className="main-layout">
      <aside className={drawerOpen ? 'sidebar is-open' : 'sidebar'} aria-label={t('navigation')}><div className="sidebar-head"><span className="sidebar-mono">B</span><span className="sidebar-name">{t('brandName')}</span><button className="icon-btn drawer-close" type="button" aria-label={t('close')} onClick={() => setDrawerOpen(false)}><Icon name="close" size={18} /></button></div>{nav.map((item) => <button key={item.key} className={section === item.key ? 'nav-item is-active' : 'nav-item'} type="button" onClick={() => navigate(item.key)}><Icon name={item.icon} size={18} /><span>{item.label}</span></button>)}<div className="sidebar-foot">© 2026 BOMBA</div></aside>
      <button className={drawerOpen ? 'drawer-overlay is-open' : 'drawer-overlay'} type="button" aria-label={t('close')} onClick={() => setDrawerOpen(false)} />
      <main className="content" aria-labelledby="page-title">
        <section className="dash-intro"><p className="dash-eyebrow">{t('workspace')}</p><h1 id="page-title">{t('greeting')} <span className="wave" aria-hidden="true">⌁</span></h1><p className="dash-subtitle">{t('dashboardSubtitle')}</p></section>
        <section className="welcome-card"><div className="welcome-icon"><Icon name="check" /></div><div><h2>{t('welcomeTitle')}</h2><p>{t('welcomeText')}</p></div></section>
        <div className="dashboard-meta"><span><i />{t('sessionActive')}</span><span><i />{t('vaultUnlocked')}</span><span>{t('build')}</span></div>
        {section === 'dashboard' || section === 'tasks' ? <section className="task-panel" aria-label={t('taskWorkspace')}>
          <div className="panel-heading"><div><p className="section-kicker">{t('taskWorkspace')}</p><h2>{t('yourTasks')}</h2></div><div className="task-count"><strong>{activeCount}</strong><span>{t('active')}</span></div></div>
          <form className="composer" onSubmit={addTask}><SmartInput id="task-title" label={t('newTask')} value={title} placeholder=" " disabled={submitting} maxLength={200} onChange={setTitle} onSubmit={() => void addTask()} /><button className="btn btn-primary" type="submit" disabled={submitting || !title.trim()}><Icon name="plus" size={17} />{submitting ? t('saving') : t('add')}</button></form>
          <div className="task-toolbar"><div className="filters" role="group" aria-label={t('filterTasks')}>{(['all', 'active', 'completed'] as const).map((option) => <button key={option} className={filter === option ? 'filter is-active' : 'filter'} type="button" onClick={() => setFilter(option)}>{t(option)}</button>)}</div><div className="search-control"><SmartInput id="task-search" label={t('search')} value={search} type="search" onChange={setSearch} /><span>{visibleTasks.length}/{tasks.length}</span></div></div>
          <div className="diagnostics"><button type="button" onClick={() => void runDiagnostic('health')}><Icon name="terminal" size={15} />{t('testApi')}</button><button type="button" onClick={() => void runDiagnostic('database')}><Icon name="refresh" size={15} />{t('testDb')}</button>{diagnostic && <code role="status">{diagnostic}</code>}</div>
          {actionError && <p className="error-message" role="alert">{actionError}</p>}{isLoading && <p className="empty-state" role="status">{t('loading')}</p>}{error && <p className="empty-state error-message" role="alert">{t('apiError')}</p>}{!isLoading && !error && visibleTasks.length === 0 && <p className="empty-state">{search ? t('noResults') : t('empty')}</p>}
          <ul className="task-list" aria-live="polite">{visibleTasks.map((task) => <li className={task.completed ? 'task completed' : 'task'} key={task.id}><button className="check-btn" type="button" disabled={busyId === task.id} aria-label={task.completed ? t('markActive', { title: task.title }) : t('complete', { title: task.title })} onClick={() => void toggleTask(task)}>{task.completed && <Icon name="check" size={15} />}</button>{editingId === task.id ? <form className="edit-form" onSubmit={(event) => { event.preventDefault(); void saveTask(task); }}><label className="sr-only" htmlFor={`edit-${task.id}`}>{t('edit')}</label><input id={`edit-${task.id}`} value={editingTitle} onChange={(event) => setEditingTitle(event.target.value)} maxLength={200} autoFocus /><button type="submit" disabled={busyId === task.id}>{t('save')}</button><button type="button" onClick={() => setEditingId(null)}>{t('cancel')}</button></form> : <span className="task-title">{task.title}</span>}{editingId !== task.id && <div className="task-actions"><button className="action-button" type="button" disabled={busyId === task.id} onClick={() => { setEditingId(task.id); setEditingTitle(task.title); }}><Icon name="edit" size={15} />{t('edit')}</button><button className="action-button danger" type="button" disabled={busyId === task.id} aria-label={`${t('delete')} ${task.title}`} onClick={() => void removeTask(task)}><Icon name="trash" size={15} />{t('delete')}</button></div>}</li>)}</ul>
        </section> : <section className="placeholder-panel"><Icon name={section === 'reports' ? 'chart' : 'user'} size={28} /><h2>{nav.find((item) => item.key === section)?.label}</h2><p>{t('moduleComingSoon')}</p><button className="btn btn-primary" type="button" onClick={() => navigate('tasks')}><Icon name="arrow" size={16} />{t('backToTasks')}</button></section>}
      </main>
    </div>
    <footer className="statusbar"><div className="status-start"><span className="status-dot" />v1.0.0</div><div className="status-center">{t('portal')}</div><div className="status-end"><span>{clock}</span><button className="icon-btn" type="button" aria-label={t('openSettings')} onClick={() => navigate('settings')}><Icon name="settings" size={17} /></button></div></footer>
  </div>;
}
