import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import '@/i18n/index.js';
import { App } from '@/App.js';

describe('App shell', () => {
  afterEach(() => cleanup());

  it('renders the reusable dashboard shell', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Sales overview' })).toBeDefined();
    expect(screen.getByText('Total records')).toBeDefined();
    expect(screen.getByText('ONLINE')).toBeDefined();
  });

  it('switches between domain-neutral modules', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Customer leads' }));
    expect(screen.getByRole('heading', { name: 'Customer leads' })).toBeDefined();
    expect(screen.getByText('This presentation layer is ready for your product-specific module. Connect your data and workflows here.')).toBeDefined();
  });
});
