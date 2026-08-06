/**
 * Typed HTTP client for the B-Tamp API.
 * @module services/api-service
 */
import axios from 'axios';

/** Task shape returned by the API. */
export type Task = { id: string; title: string; completed: boolean; createdAt: string; updatedAt: string };
/** Standard API envelope. */
export type ApiResponse<T> = { success: boolean; data: T; error: unknown; meta: unknown };

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api/v1', headers: { 'Content-Type': 'application/json' } });

api.interceptors.response.use((response) => response, (error) => Promise.reject(new Error(error.response?.data?.error?.message ?? error.response?.data?.error ?? 'Request failed')));

/** Task resource API. */
export const tasksApi = {
  /** Fetches all tasks. */
  list: () => api.get<ApiResponse<Task[]>>('/tasks').then((response) => response.data.data),
  /** Creates a task. */
  create: (title: string) => api.post<ApiResponse<Task>>('/tasks', { title }).then((response) => response.data.data),
  /** Updates a task. */
  update: (id: string, values: Partial<Pick<Task, 'title' | 'completed'>>) => api.patch<ApiResponse<Task>>(`/tasks/${id}`, values).then((response) => response.data.data),
  /** Deletes a task. */
  remove: (id: string) => api.delete(`/tasks/${id}`),
  /** Checks the health endpoint. */
  health: () => api.get<ApiResponse<{ status: string }>>('/health').then((response) => response.data.data),
  /** Checks database connectivity. */
  database: () => api.get<ApiResponse<{ connected: boolean }>>('/test/db').then((response) => response.data.data),
};
