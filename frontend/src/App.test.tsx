import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import '@/i18n/index.js';
import { App } from '@/App.js';

describe('App shell', () => {
  afterEach(() => cleanup());

  it('renders the splash screen before entering the workspace', async () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Preparing your workspace' })).toBeDefined();
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Sign in' })).toBeDefined(), { timeout: 3000 });
  });

  it('opens the auth screen and supports recovery navigation', async () => {
    const user = userEvent.setup();
    render(<App />);
    await waitFor(() => expect(screen.getByRole('heading', { name: 'Sign in' })).toBeDefined(), { timeout: 3000 });
    await user.click(screen.getByRole('button', { name: 'Forgot password?' }));
    expect(screen.getByRole('heading', { name: 'Forgot password' })).toBeDefined();
  });
});
