import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { apolloClient } from 'core/apollo';
import { Routes } from 'core/routes';
import { SentryErrorBoundary } from 'core/sentry';

import 'resources/styles/index.scss';

ReactDOM.render(
	<ApolloProvider client={apolloClient}>
		<BrowserRouter>
			<SentryErrorBoundary>
				<Routes />
			</SentryErrorBoundary>
		</BrowserRouter>
	</ApolloProvider>,
	document.getElementById('root'),
);
