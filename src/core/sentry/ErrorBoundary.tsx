import React, { FC } from 'react';
import * as Sentry from '@sentry/react';

export const SentryErrorBoundary: FC = ({ children }) => (
	<Sentry.ErrorBoundary
		fallback={() => (
			<React.Fragment>
				<div
					style={{
						padding: '50px 20px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100vh',
						width: '100vw',
						position: 'absolute',
						left: 0,
						top: 0,
					}}
				>
					<h2>Something went wrong. Please refresh the page</h2>
				</div>
			</React.Fragment>
		)}
	>
		{children}
	</Sentry.ErrorBoundary>
);
