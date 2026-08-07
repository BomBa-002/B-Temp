import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icon.js';

type DashboardViewProps = { t: (key: string) => string; sectionLabel: string };

const funnel = [
  { label: 'Lead to Opportunity', value: '1,000', width: '100%' },
  { label: 'Opportunity to Proposal', value: '958', width: '76%' },
  { label: 'Proposal to Negotiate', value: '147', width: '52%' },
  { label: 'Negotiate to Closed Won', value: '57', width: '30%' },
];
const trend = [46, 58, 52, 66, 62, 79, 69, 88, 78, 94];

function Ring({ value, label, tone = 'amber' }: { value: string; label: string; tone?: 'amber' | 'cyan' }) {
  return <div className={`kpi-ring kpi-ring-${tone}`}><div><strong>{value}</strong><span>{label}</span></div></div>;
}

/** High-density KPI composition matching the reusable enterprise dashboard reference. */
export function DashboardView({ t, sectionLabel }: DashboardViewProps) {
  return <div className="dashboard-view reference-dashboard">
    <section className="dashboard-heading"><div className="dashboard-title"><p className="dash-eyebrow">{t('workspace')}</p><h1>{sectionLabel}</h1></div><div className="dashboard-tools"><label className="system-search"><Icon name="search" size={16} /><input aria-label={t('searchSystem')} placeholder={t('searchSystem')} /></label><button className="icon-btn" type="button" aria-label={t('notifications')}><Icon name="bell" /></button><button className="avatar-button" type="button" aria-label={t('profile')}>AH</button></div></section>
    <section className="kpi-frame"><header className="kpi-frame-title">{t('keyMetrics')}</header><div className="kpi-hero"><article className="funnel-card"><h2>{t('salesFunnel')}</h2><div className="funnel-stages">{funnel.map((stage) => <div className="funnel-stage" key={stage.label}><span className="funnel-label">{t(stage.label)}</span><div className="funnel-shape" style={{ '--funnel-width': stage.width } as CSSProperties}><strong>{stage.value}</strong></div><span className="funnel-rate">{stage.value === '57' ? '35%' : stage.value === '147' ? '12.3%' : stage.value === '958' ? '3.00%' : '25.6%'}</span></div>)}</div></article><article className="revenue-card"><h2>{t('revenueTarget')}</h2><Ring value="88%" label={t('targetReached')} tone="cyan" /><p><strong>FY TARGET: 1.2M</strong><span>REVENUE SO FAR: 1.05M</span></p></article></div></section>
    <section className="kpi-grid"><article className="kpi-panel"><h2>{t('productPerformance')}</h2><Ring value="74%" label={t('topSelling')} /><p><strong>{t('bestSeller')}: Pro Series</strong><span>{t('unitGrowth')}: +12%</span></p></article><article className="kpi-panel"><h2>{t('customerAcquisition')}</h2><Ring value="9%" label={t('growth')} /><p><strong>{t('newCustomers')}: +114</strong><span>{t('averageDeal')}: 8.5K</span></p></article><article className="kpi-panel trend-panel"><h2>{t('monthlyTrend')}</h2><div className="trend-chart" role="img" aria-label={t('monthlyTrend')}>{trend.map((height, index) => <span key={`${height}-${index}`} style={{ height: `${height}%` }} />)}</div><div className="trend-labels"><b>JUL · 145K</b><b>AUG · 155K</b></div><p>{t('monthlyTrend')}</p></article></section>
  </div>;
}
