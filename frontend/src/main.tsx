/**
 * Frontend application entrypoint.
 * @module main
 */
import { createRoot, React } from '@a';
import '@/i18n/index.js';
import { App } from '@/App.js';
import '@/styles.css';

createRoot(document.getElementById('root')!).render(React.createElement(React.StrictMode, null, React.createElement(App)));
