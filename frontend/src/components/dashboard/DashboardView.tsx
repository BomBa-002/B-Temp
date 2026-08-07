import type { CSSProperties } from 'react';
import { Icon } from '@/components/Icon.js';

type DashboardViewProps = { t: (key: string) => string; sectionLabel: string };

const metrics = [
  { value: '1,248', label: 'totalRecords', icon: 'users' as const, change: '+12.4%' },
  { value: '88.6%', label: 'completionRate', icon: 'activity' as const, change: '+4.8%' },
  { value: '742', label: 'activeItems', icon: 'boxes' as const, change: '+8.2%' },
  { value: '24', label: 'openAlerts', icon: 'bell' as const, change: '-2.1%' },
];

const trend = [38, 46, 42, 58, 54, 69, 64, 81, 76, 88, 83, 96];

/** Presentation-only dashboard surface with domain-neutral metrics. */
export function DashboardView({ t, sectionLabel }: DashboardViewProps) {
  return <div className="dashboard-view">
    <section className="dashboard-heading"><div><p className="dash-eyebrow">{t('workspace')}</p><h1>{sectionLabel}</h1><p className="dash-subtitle">{t('dashboardSubtitle')}</p></div><div className="heading-actions"><span className="live-indicator"><i />{t('liveData')}</span><button className="btn btn-quiet" type="button"><Icon name="download" size={16} />{t('export')}</button></div></section>
    <section className="metric-grid" aria-label={t('keyMetrics')}>{metrics.map((metric) => <article className="metric-card" key={metric.label}><div className="metric-icon"><Icon name={metric.icon} size={19} /></div><div className="metric-copy"><span>{t(metric.label)}</span><strong>{metric.value}</strong><small className={metric.change.startsWith('-') ? 'metric-change is-negative' : 'metric-change'}>{metric.change} <em>{t('vsPrevious')}</em></small></div></article>)}</section>
    <section className="dashboard-grid">
      <article className="panel performance-panel"><div className="panel-heading"><div><p className="section-kicker">{t('overview')}</p><h2>{t('performanceOverview')}</h2></div><button className="icon-btn" type="button" aria-label={t('openSettings')}><Icon name="more" /></button></div><div className="chart-area" aria-label={t('performanceChart')} role="img"><div className="chart-y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart-bars">{trend.map((height, index) => <div className="bar-column" key={`${height}-${index}`}><div className="bar" style={{ height: `${height}%` }} /><span>{['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][index]}</span></div>)}</div></div><div className="panel-footer"><span><i className="legend-dot" />{t('currentPeriod')}</span><strong>+18.6%</strong></div></article>
      <article className="panel progress-panel"><div className="panel-heading"><div><p className="section-kicker">{t('target')}</p><h2>{t('progress')}</h2></div><Icon name="target" /></div><div className="progress-ring" style={{ '--progress': '74%' } as CSSProperties}><strong>74%</strong><span>{t('achieved')}</span></div><div className="target-note"><span>{t('targetValue')}</span><strong>1.2M</strong></div></article>
    </section>
    <section className="dashboard-grid lower-grid"><article className="panel activity-panel"><div className="panel-heading"><div><p className="section-kicker">{t('recent')}</p><h2>{t('recentActivity')}</h2></div><button className="text-button" type="button">{t('viewAll')}</button></div><ul className="activity-list">{['activityOne', 'activityTwo', 'activityThree', 'activityFour'].map((item, index) => <li key={item}><span className={`activity-avatar avatar-${index + 1}`}>{['AH', 'SD', 'GR', 'MK'][index]}</span><div><strong>{t(item)}</strong><small>{t('justNow')}</small></div><Icon name="arrow" size={15} /></li>)}</ul></article><article className="panel status-panel"><div className="panel-heading"><div><p className="section-kicker">{t('system')}</p><h2>{t('moduleStatus')}</h2></div><span className="status-badge success">{t('operational')}</span></div><div className="module-status"><span><i className="status-dot" />{t('apiGateway')}</span><strong>99.98%</strong></div><div className="module-status"><span><i className="status-dot" />{t('dataLayer')}</span><strong>99.91%</strong></div><div className="module-status"><span><i className="status-dot" />{t('notificationService')}</span><strong>99.86%</strong></div><div className="status-foot"><Icon name="check" size={16} />{t('allSystemsOperational')}</div></article></section>
  </div>;
}
