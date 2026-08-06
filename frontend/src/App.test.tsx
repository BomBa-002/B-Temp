/**
 * Smoke tests for the task workspace.
 * @module App.test
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@/i18n/index.js';
import { App } from '@/App.js';

describe('App', () => {
  it('renders the workspace heading', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeDefined();
  });
});
