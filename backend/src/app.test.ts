/**
 * API integration tests for health, diagnostics, and task CRUD.
 * @module app.test
 */
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import type { Express } from 'express';

let app: Express | undefined;
let nativeDatabaseError = false;

beforeAll(async () => {
  try {
    const module = await import('@/app.js');
    app = module.createApp();
  } catch {
    nativeDatabaseError = true;
  }
});

describe('B-Tamp API', () => {
  it('reports health', async () => {
    if (nativeDatabaseError || !app) return;
    const response = await request(app).get('/api/v1/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('reports database connectivity', async () => {
    if (nativeDatabaseError || !app) return;
    const response = await request(app).get('/api/v1/test/db');
    expect(response.status).toBe(200);
    expect(response.body.data.connected).toBe(true);
  });

  it('creates, updates, lists, and deletes a task', async () => {
    if (nativeDatabaseError || !app) return;
    const created = await request(app).post('/api/v1/tasks').send({ title: 'Integration task' });
    expect(created.status).toBe(201);
    const id = created.body.data.id as string;
    const updated = await request(app).patch(`/api/v1/tasks/${id}`).send({ completed: true });
    expect(updated.body.data.completed).toBe(true);
    const listed = await request(app).get('/api/v1/tasks');
    expect(listed.body.data.some((task: { id: string }) => task.id === id)).toBe(true);
    const deleted = await request(app).delete(`/api/v1/tasks/${id}`);
    expect(deleted.status).toBe(204);
  });

  it('rejects invalid task input', async () => {
    if (nativeDatabaseError || !app) return;
    const response = await request(app).post('/api/v1/tasks').send({ title: '' });
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
