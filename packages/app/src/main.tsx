import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from '@thai-master/fuse';
import { App } from './App';

// Initialize Sentry before React renders
// Gracefully degrade if DSN is not configured
const sentryDsn = import.meta.env.VITE_SENTRY_DSN;

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    environment: import.meta.env.MODE, // 'development' or 'production'
    release: '0.1.0', // From package.json version
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // 100% transaction sampling for POC
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% session replay sampling
    replaysOnErrorSampleRate: 1.0, // 100% replay on errors
  });
} else {
  console.warn(
    'Sentry DSN not configured. Error tracking is disabled. ' +
    'Set VITE_SENTRY_DSN in .env.local to enable error tracking.'
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Sentry.ErrorBoundary
        fallback={({ error, resetError }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#e74c3c' }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: '1.5rem', color: '#666', maxWidth: '500px' }}>
            The app encountered an unexpected error. This has been reported to our team.
            You can try reloading the app to continue.
          </p>
          <button
            onClick={() => {
              resetError();
              window.location.reload();
            }}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Reload App
          </button>
          {import.meta.env.MODE === 'development' && (
            <details style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px' }}>
              <summary style={{ cursor: 'pointer', color: '#666' }}>
                Error Details (Development Only)
              </summary>
              <pre
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                }}
              >
                {error instanceof Error ? error.toString() : String(error)}
              </pre>
            </details>
          )}
        </div>
      )}
        showDialog={false}
      >
        <App />
      </Sentry.ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
