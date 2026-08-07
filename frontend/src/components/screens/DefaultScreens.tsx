import { useEffect, useState, type ReactNode } from 'react';
import { Icon } from '@/components/Icon.js';
import { DefaultLayout } from '@/components/layout/DefaultLayout.js';

type ScreenProps = {
  children?: ReactNode;
  t: (key: string) => string;
  clock: string;
  theme: 'dark' | 'light';
  brandName: string;
  portal: string;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onEnter: () => void;
};

type AuthMode = 'signin' | 'signup' | 'forgot' | 'verify';

function ScreenFrame({ children, ...props }: ScreenProps) {
  return <DefaultLayout portalLabel={props.portal} {...props} languageLabel={props.t('language')} themeLabel={props.t('toggleTheme')}>{children}</DefaultLayout>;
}

export function SplashScreen(props: ScreenProps) {
  const [progress, setProgress] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setProgress((value) => Math.min(value + 8, 100)), 180); return () => window.clearInterval(timer); }, []);
  useEffect(() => { if (progress === 100) props.onEnter(); }, [progress, props]);
  return <ScreenFrame {...props}><section className="state-screen splash-screen" aria-label={props.t('splashTitle')}><div className="splash-logo"><span>B</span></div><p className="state-kicker">{props.t('portal')}</p><h1>{props.t('splashTitle')}</h1><p className="state-copy">{props.t('splashSubtitle')}</p><div className="boot-progress"><div className="boot-progress-track"><span style={{ width: `${progress}%` }} /></div><strong>{progress}%</strong></div><ul className="boot-steps">{['bootStepOne', 'bootStepTwo', 'bootStepThree'].map((step, index) => <li className={progress >= (index + 1) * 30 ? 'is-ready' : ''} key={step}><Icon name={progress >= (index + 1) * 30 ? 'check' : 'arrow'} size={14} />{props.t(step)}</li>)}</ul></section></ScreenFrame>;
}

export function ErrorScreen({ t, ...props }: ScreenProps) {
  return <ScreenFrame t={t} {...props}><section className="state-screen error-screen" aria-labelledby="error-title"><div className="state-icon error-icon"><Icon name="database" size={40} /></div><p className="state-kicker">{t('criticalError')}</p><h1 id="error-title">{t('errorTitle')}</h1><p className="state-copy">{t('errorCopy')}</p><div className="error-checks">{['errorCheckOne', 'errorCheckTwo', 'errorCheckThree'].map((item) => <div key={item}><Icon name="arrow" size={14} />{t(item)}<i /></div>)}</div><button className="btn btn-primary" type="button" onClick={props.onEnter}><Icon name="refresh" size={16} />{t('retryConnection')}</button></section></ScreenFrame>;
}

export function AuthScreen({ t, ...props }: ScreenProps) {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [submitted, setSubmitted] = useState(false);
  const config = { signin: { title: 'signInTitle', subtitle: 'signInSubtitle', action: 'signInAction', icon: 'key' as const }, signup: { title: 'signUpTitle', subtitle: 'signUpSubtitle', action: 'signUpAction', icon: 'users' as const }, forgot: { title: 'forgotTitle', subtitle: 'forgotSubtitle', action: 'forgotAction', icon: 'mail' as const }, verify: { title: 'verifyTitle', subtitle: 'verifySubtitle', action: 'verifyAction', icon: 'check' as const } }[mode];
  return <ScreenFrame t={t} {...props}><section className="auth-screen" aria-labelledby="auth-title"><div className="auth-mark"><span>B</span></div><div className="auth-card"><div className="auth-card-heading"><div><p className="state-kicker">{t('authPortal')}</p><h1 id="auth-title">{t(config.title)}</h1></div><Icon name={config.icon} size={24} /></div><p className="state-copy">{t(config.subtitle)}</p>{submitted ? <div className="auth-success"><Icon name="check" size={22} /><strong>{t('authSuccess')}</strong><button className="btn btn-primary" type="button" onClick={props.onEnter}>{t('openWorkspace')}</button><button className="text-button" type="button" onClick={() => setSubmitted(false)}>{t('tryAgain')}</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>{t(mode === 'verify' ? 'verificationCode' : mode === 'signup' ? 'fullName' : 'email')}<input required inputMode={mode === 'verify' ? 'numeric' : undefined} placeholder={t(mode === 'verify' ? 'verificationPlaceholder' : 'inputPlaceholder')} /></label>{mode !== 'forgot' && mode !== 'verify' && <label>{t('password')}<input required type="password" placeholder="••••••••" /></label>}<button className="btn btn-primary auth-submit" type="submit">{t(config.action)}<Icon name="arrow" size={16} /></button></form>}<div className="auth-links">{mode !== 'signin' && <button type="button" onClick={() => { setMode('signin'); setSubmitted(false); }}>{t('backToSignIn')}</button>}{mode === 'signin' && <><button type="button" onClick={() => setMode('forgot')}>{t('forgotPassword')}</button><button type="button" onClick={() => setMode('signup')}>{t('createAccount')}</button></>}{mode === 'signup' && <button type="button" onClick={() => setMode('verify')}>{t('verifyIdentity')}</button>}</div></div></section></ScreenFrame>;
}
