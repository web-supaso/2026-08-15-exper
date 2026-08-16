import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

// Global resilience handler for stale chunk / script load errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const msg = event?.message || '';
    if (
      msg.includes('Cannot access') ||
      msg.includes('is not defined') ||
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Loading chunk')
    ) {
      const key = 'mkt_global_reload_attempt';
      const lastAttempt = sessionStorage.getItem(key);
      const now = Date.now();
      if (!lastAttempt || now - parseInt(lastAttempt, 10) > 15000) {
        sessionStorage.setItem(key, now.toString());
        window.location.reload();
      }
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
