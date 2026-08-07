import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon.js';

type DefaultLayoutProps = {
  children: ReactNode;
  portalLabel: string;
  brandName: string;
  languageLabel: string;
  themeLabel: string;
  closeLabel?: string;
  theme: 'dark' | 'light';
  clock: string;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
};

/** Minimal chrome for boot, authentication, and recovery surfaces. */
export function DefaultLayout({ children, portalLabel, brandName, languageLabel, themeLabel, theme, clock, onToggleTheme, onToggleLanguage }: DefaultLayoutProps) {
  return <div className="default-layout">
    <header className="default-topbar"><div className="default-brand"><span className="brand-mono">B</span><strong>{brandName}</strong></div><span className="default-portal">{portalLabel}</span><div className="default-actions"><button className="icon-btn" type="button" aria-label={languageLabel} onClick={onToggleLanguage}><Icon name="globe" /></button><button className="icon-btn" type="button" aria-label={themeLabel} onClick={onToggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button></div></header>
    <main className="default-content">{children}</main>
    <footer className="default-statusbar"><span><i className="status-dot" />ONLINE</span><span className="status-badge">PROD</span><span className="default-status-spacer" /><span>{clock}</span></footer>
  </div>;
}
