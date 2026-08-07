import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon.js';

type Section = 'dashboard' | 'leads' | 'orders' | 'inventory' | 'pipeline' | 'reports' | 'settings';
type Theme = 'light' | 'dark';

type AppShellProps = {
  children: ReactNode;
  section: Section;
  theme: Theme;
  clock: string;
  drawerOpen: boolean;
  brandName: string;
  portal: string;
  navigationLabel: string;
  openMenuLabel: string;
  closeLabel: string;
  toggleThemeLabel: string;
  languageLabel: string;
  settingsLabel: string;
  onNavigate: (section: Section) => void;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onDrawerChange: (open: boolean) => void;
  nav: Array<{ key: Section; label: string; icon: IconName }>;
};

/** Shared application chrome for the reusable enterprise template. */
export function AppShell({ children, section, theme, clock, drawerOpen, brandName, portal, navigationLabel, openMenuLabel, closeLabel, toggleThemeLabel, languageLabel, settingsLabel, onNavigate, onToggleTheme, onToggleLanguage, onDrawerChange, nav }: AppShellProps) {
  return <div id="app" className="app-shell">
    <header className="titlebar">
      <button className="icon-btn hamburger" type="button" aria-label={openMenuLabel} onClick={() => onDrawerChange(true)}><Icon name="menu" /></button>
      <div className="titlebar-brand"><span className="brand-mono">B</span><span className="brand-name">{brandName}</span></div>
      <div className="titlebar-center">{portal}</div>
      <div className="titlebar-end">
        <button className="icon-btn" type="button" aria-label={toggleThemeLabel} onClick={onToggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
        <button className="icon-btn" type="button" aria-label={languageLabel} onClick={onToggleLanguage}><Icon name="globe" /></button>
        <button className="icon-btn" type="button" aria-label={settingsLabel} onClick={() => onNavigate('settings')}><Icon name="settings" /></button>
      </div>
    </header>
    <div className="main-layout">
      <aside className={drawerOpen ? 'sidebar is-open' : 'sidebar'} aria-label={navigationLabel}>
        <div className="sidebar-head"><span className="sidebar-mono">B</span><span className="sidebar-name">{brandName}</span><button className="icon-btn drawer-close" type="button" aria-label={closeLabel} onClick={() => onDrawerChange(false)}><Icon name="close" /></button></div>
        <nav className="nav-list">{nav.map((item) => <button key={item.key} className={section === item.key ? 'nav-item is-active' : 'nav-item'} type="button" onClick={() => onNavigate(item.key)}><Icon name={item.icon} size={18} /><span>{item.label}</span></button>)}</nav>
        <div className="sidebar-foot">© 2026 BOMBA <span>•</span> v1.1.0</div>
      </aside>
      <button className={drawerOpen ? 'drawer-overlay is-open' : 'drawer-overlay'} type="button" aria-label={closeLabel} onClick={() => onDrawerChange(false)} />
      <main className="content">{children}</main>
    </div>
    <footer className="statusbar"><div className="status-start"><span className="status-dot" />ONLINE <span className="status-badge">PROD</span></div><div className="status-center">{portal}</div><div className="status-end"><span>{clock}</span><button className="icon-btn" type="button" aria-label={settingsLabel} onClick={() => onNavigate('settings')}><Icon name="settings" size={17} /></button></div></footer>
  </div>;
}

export type { Section, Theme };
