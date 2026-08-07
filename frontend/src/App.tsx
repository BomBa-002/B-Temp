import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/i18n/index.js';
import { Icon } from '@/components/Icon.js';
import { AppShell, type Section, type Theme } from '@/components/layout/AppShell.js';
import { DashboardView } from '@/components/dashboard/DashboardView.js';

type Translation = (key: string) => string;

function ModuleView({ t, title, icon }: { t: Translation; title: string; icon: 'users' | 'boxes' | 'cart' | 'funnel' | 'chart' | 'settings' }) {
  return <section className="module-view"><div className="module-icon"><Icon name={icon} size={30} /></div><p className="section-kicker">{t('module')}</p><h1>{title}</h1><p>{t('moduleComingSoon')}</p><button className="btn btn-primary" type="button"><Icon name="plus" size={16} />{t('configureModule')}</button></section>;
}

/** Application composition root; domain modules plug into this reusable shell. */
export function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<Theme>('dark');
  const [section, setSection] = useState<Section>('dashboard');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => { const timer = window.setInterval(() => setClock(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })), 30000); return () => window.clearInterval(timer); }, []);

  function navigate(next: Section) { setSection(next); setDrawerOpen(false); }
  function toggleLanguage() { void setLanguage(i18n.language === 'en' ? 'ar' : 'en'); }

  const nav = [
    { key: 'dashboard' as const, label: t('navDashboard'), icon: 'grid' as const },
    { key: 'leads' as const, label: t('navLeads'), icon: 'users' as const },
    { key: 'orders' as const, label: t('navOrders'), icon: 'cart' as const },
    { key: 'inventory' as const, label: t('navInventory'), icon: 'boxes' as const },
    { key: 'pipeline' as const, label: t('navPipeline'), icon: 'funnel' as const },
    { key: 'reports' as const, label: t('navReports'), icon: 'chart' as const },
    { key: 'settings' as const, label: t('navSettings'), icon: 'settings' as const },
  ];
  const currentTitle = nav.find((item) => item.key === section)?.label ?? t('navDashboard');

  return <AppShell section={section} theme={theme} clock={clock} drawerOpen={drawerOpen} brandName={t('brandName')} portal={t('portal')} navigationLabel={t('navigation')} openMenuLabel={t('openMenu')} closeLabel={t('close')} toggleThemeLabel={t('toggleTheme')} languageLabel={t('language')} settingsLabel={t('openSettings')} onNavigate={navigate} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} onToggleLanguage={toggleLanguage} onDrawerChange={setDrawerOpen} nav={nav}>
    {section === 'dashboard' ? <DashboardView t={t} sectionLabel={currentTitle} /> : <ModuleView t={t} title={currentTitle} icon={nav.find((item) => item.key === section)?.icon as 'users' | 'boxes' | 'cart' | 'funnel' | 'chart' | 'settings'} />}
  </AppShell>;
}
