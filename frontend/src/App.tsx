import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import useSWR from 'swr';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/v1';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse<T> = { data: T; error: unknown };

const fetcher = (url: string) => fetch(url).then((response) => response.json());

async function mutateTask(url: string, options: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });
  const payload = (await response.json().catch(() => null)) as ApiResponse<Task> | null;
  if (!response.ok) throw new Error(typeof payload?.error === 'string' ? payload.error : 'Request failed');
  return payload?.data;
}

export function App() {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Task[]>>(`${API_URL}/tasks`, fetcher);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [actionError, setActionError] = useState('');

  const tasks = data?.data ?? [];
  const visibleTasks = useMemo(() => tasks.filter((task) => filter === 'all' || (filter === 'active' ? !task.completed : task.completed)), [tasks, filter]);
  const activeCount = tasks.filter((task) => !task.completed).length;

  async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setActionError('');
    try {
      await mutateTask(`${API_URL}/tasks`, { method: 'POST', body: JSON.stringify({ title }) });
      setTitle('');
      await mutate();
    } catch (requestError) {
      setActionError(requestError instanceof Error ? requestError.message : 'Could not add task');
    }
  }

  async function toggleTask(task: Task) {
    setActionError('');
    try {
      await mutateTask(`${API_URL}/tasks/${task.id}`, { method: 'PATCH', body: JSON.stringify({ completed: !task.completed }) });
      await mutate();
    } catch (requestError) {
      setActionError(requestError instanceof Error ? requestError.message : 'Could not update task');
    }
  }

  async function removeTask(task: Task) {
    setActionError('');
    try {
      await mutateTask(`${API_URL}/tasks/${task.id}`, { method: 'DELETE' });
      await mutate();
    } catch (requestError) {
      setActionError(requestError instanceof Error ? requestError.message : 'Could not remove task');
    }
  }

  return (
    <main className="shell">
      <section className="app-card" aria-labelledby="page-title">
        <header className="hero">
          <div className="brand-mark" aria-hidden="true">B</div>
          <div>
            <p className="eyebrow">B-TAMP / WORKSPACE</p>
            <h1 id="page-title">Make room for what matters.</h1>
            <p className="subtitle">A focused task board for turning loose ends into forward motion.</p>
          </div>
          <div className="status-pill"><span className="status-dot" /> API online</div>
        </header>

        <form className="composer" onSubmit={addTask}>
          <label className="sr-only" htmlFor="task-title">New task</label>
          <input id="task-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs your attention?" maxLength={200} />
          <button type="submit">Add task <span aria-hidden="true">+</span></button>
        </form>

        <div className="toolbar">
          <div><strong>{activeCount}</strong> active {activeCount === 1 ? 'task' : 'tasks'}</div>
          <div className="filters" role="group" aria-label="Filter tasks">
            {(['all', 'active', 'completed'] as const).map((option) => <button key={option} className={filter === option ? 'filter active' : 'filter'} onClick={() => setFilter(option)} type="button">{option}</button>)}
          </div>
        </div>

        {actionError && <p className="error" role="alert">{actionError}</p>}
        {isLoading && <p className="empty-state">Loading your workspace...</p>}
        {error && <p className="empty-state error" role="alert">The task API is unavailable. Start the backend on port 4000.</p>}
        {!isLoading && !error && visibleTasks.length === 0 && <p className="empty-state">No tasks here yet. Add one small, concrete next step.</p>}

        <ul className="task-list" aria-live="polite">
          {visibleTasks.map((task) => <li className={task.completed ? 'task completed' : 'task'} key={task.id}>
            <button className="check" type="button" aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`} onClick={() => toggleTask(task)}>{task.completed ? '✓' : ''}</button>
            <span className="task-title">{task.title}</span>
            <button className="delete" type="button" aria-label={`Delete ${task.title}`} onClick={() => removeTask(task)}>Delete</button>
          </li>)}
        </ul>

        <footer className="footer"><span>LOCAL-FIRST / SQLITE</span><span>BUILD 0.1</span></footer>
      </section>
    </main>
  );
}
