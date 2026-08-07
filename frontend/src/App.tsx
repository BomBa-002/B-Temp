import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/i18n/index.js';
import { AppShell, type Section, type Theme } from '@/components/layout/AppShell.js';
import { DashboardView } from '@/components/dashboard/DashboardView.js';
import { AppDashboard } from '@/components/screens/AppDashboard.js';
import { AuthScreen, ErrorScreen, SplashScreen } from '@/components/screens/DefaultScreens.js';

type AppMode = 'splash' | 'auth' | 'error' | 'app';
type Translation = (key: string) => string;

function ModuleView({ t, title }: { t: Translation; title: string }) {
  return <section className="module-view"><p className="section-kicker">{t('module')}</p><h1>{title}</h1><p>{t('moduleComingSoon')}</p><button className="btn btn-primary" type="button">{t('configureModule')}</button></section>;
}

/** Composition root for the reusable default and dashboard layouts. */
export function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>('dark');
  const [mode, setMode] = useState<AppMode>('splash');
  const [section, setSection] = useState<Section>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { const timer = window.setInterval(() => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 30000); return () => window.clearInterval(timer); }, []);
  function toggleLanguage() { void setLanguage(i18n.language === 'en' ? 'ar' : 'en'); }
  const nav = [
    { key: 'dashboard' as const, label: t('navDashboard'), icon: 'grid' as const }, { key: 'leads' as const, label: t('navLeads'), icon: 'users' as const }, { key: 'orders' as const, label: t('navOrders'), icon: 'cart' as const }, { key: 'inventory' as const, label: t('navInventory'), icon: 'boxes' as const }, { key: 'pipeline' as const, label: t('navPipeline'), icon: 'funnel' as const }, { key: 'reports' as const, label: t('navReports'), icon: 'chart' as const }, { key: 'settings' as const, label: t('navSettings'), icon: 'settings' as const },
  ];
  const defaultProps = { t, clock, theme, brandName: t('brandName'), portal: t('portal'), onToggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark'), onToggleLanguage: toggleLanguage, onEnter: () => setMode('auth'), onSuccess: () => setMode('app') };
  if (mode === 'splash') return <SplashScreen {...defaultProps} />;
  if (mode === 'error') return <ErrorScreen {...defaultProps} />;
  if (mode === 'auth') return <AuthScreen {...defaultProps} />;
  function navigate(next: Section) { setSection(next); setDrawerOpen(false); }
  const currentTitle = nav.find((item) => item.key === section)?.label ?? t('navDashboard');
  return <AppShell section={section} theme={theme} clock={clock} drawerOpen={drawerOpen} brandName={t('brandName')} portal={t('portal')} navigationLabel={t('navigation')} openMenuLabel={t('openMenu')} closeLabel={t('close')} toggleThemeLabel={t('toggleTheme')} languageLabel={t('language')} settingsLabel={t('openSettings')} onNavigate={navigate} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} onToggleLanguage={toggleLanguage} onDrawerChange={setDrawerOpen} nav={nav}>
    {section === 'dashboard' ? (mode === 'app' ? <DashboardView t={t} sectionLabel={currentTitle} /> : <AppDashboard t={t} onContinue={() => setMode('app')} />) : <ModuleView t={t} title={currentTitle} />}
  </AppShell>;
}
