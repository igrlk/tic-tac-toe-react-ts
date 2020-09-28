import * as Sentry from '@sentry/react';

export { SentryErrorBoundary } from './ErrorBoundary';

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_DSN,
	release: '1',
	enabled: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
});
