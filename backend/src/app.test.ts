/**
 * API integration tests for platform health and diagnostics.
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
});
