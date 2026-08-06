/**
 * Interaction tests for the task workspace.
 * @module App.test
 */
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@/i18n/index.js';
import { App } from '@/App.js';
import { tasksApi } from '@/services/api.service.js';

vi.mock('@/services/api.service.js', async () => {
  const actual = await vi.importActual<typeof import('@/services/api.service.js')>('@/services/api.service.js');
  return { ...actual, tasksApi: { ...actual.tasksApi, list: vi.fn(), create: vi.fn(), update: vi.fn(), remove: vi.fn() } };
});

const mockedApi = vi.mocked(tasksApi);
const task = { id: 'task-1', title: 'Write release notes', completed: false, createdAt: '', updatedAt: '' };

describe('App', () => {
  afterEach(() => cleanup());

  beforeEach(() => {
    vi.clearAllMocks();
    mockedApi.list.mockResolvedValue([task]);
    mockedApi.create.mockResolvedValue({ ...task, id: 'task-2', title: 'New task' });
    mockedApi.update.mockResolvedValue({ ...task, completed: true });
    mockedApi.remove.mockResolvedValue({} as never);
  });

  it('renders the workspace heading and loaded task', async () => {
    render(<SWRConfig value={{ provider: () => new Map() }}><App /></SWRConfig>);
    expect(screen.getByRole('heading', { name: /Good evening/i })).toBeDefined();
    expect(await screen.findByText('Write release notes')).toBeDefined();
  });

  it('filters tasks by search text', async () => {
    const user = userEvent.setup();
    render(<SWRConfig value={{ provider: () => new Map() }}><App /></SWRConfig>);
    await screen.findByText('Write release notes');
    await user.type(screen.getByLabelText('Search tasks...'), 'missing');
    expect(screen.getByText('No tasks match your search.')).toBeDefined();
  });

  it('creates a task from the composer', async () => {
    const user = userEvent.setup();
    render(<SWRConfig value={{ provider: () => new Map() }}><App /></SWRConfig>);
    const input = screen.getByLabelText('What needs your attention?');
    await user.type(input, 'New task');
    await user.click(screen.getByRole('button', { name: /add task/i }));
    await waitFor(() => expect(mockedApi.create).toHaveBeenCalledWith('New task'));
  });

  it('edits and completes a task', async () => {
    const user = userEvent.setup();
    render(<SWRConfig value={{ provider: () => new Map() }}><App /></SWRConfig>);
    await screen.findByText('Write release notes');
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    const editInput = screen.getByDisplayValue('Write release notes');
    await user.clear(editInput);
    await user.type(editInput, 'Publish release notes');
    await user.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(mockedApi.update).toHaveBeenCalledWith('task-1', { title: 'Publish release notes' }));
  });
});
