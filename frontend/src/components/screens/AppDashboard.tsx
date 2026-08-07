import { Icon } from '@/components/Icon.js';

type AppDashboardProps = { t: (key: string) => string; onContinue: () => void };

/** Minimal first destination for a newly authenticated user. */
export function AppDashboard({ t, onContinue }: AppDashboardProps) {
  return <section className="welcome-screen" aria-labelledby="welcome-title"><div className="welcome-orbit"><span className="welcome-core">B</span><i /><i /><i /></div><p className="state-kicker">{t('workspace')}</p><h1 id="welcome-title">{t('welcomeTitle')}</h1><p className="state-copy">{t('welcomeCopy')}</p><button className="btn btn-primary" type="button" onClick={onContinue}>{t('openWorkspace')}<Icon name="arrow" size={16} /></button><div className="welcome-meta"><span><Icon name="check" size={14} />{t('readyToConfigure')}</span><span><Icon name="database" size={14} />{t('dataPrivate')}</span></div></section>;
}
