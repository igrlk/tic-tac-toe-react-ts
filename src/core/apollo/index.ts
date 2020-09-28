import { HttpLink } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';

import Storage from 'library/common/utils/storage';
import { getMainDefinition } from 'apollo-utilities';

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
		);
	}

	if (networkError) {
		console.log(`[Network error]: ${networkError}`);
	}
});

const createOmitTypenameLink = () =>
	new ApolloLink((operation, forward) => {
		if (operation.variables) {
			operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename);
		}

		return forward(operation);
	});

const omitTypename = (key: string, value: any) => (key === '__typename' ? undefined : value);

const wsLink = new WebSocketLink({
	uri: process.env.REACT_APP_WS_URL!,
	options: {
		reconnect: true,
	},
});

const httpLink = new HttpLink({
	uri: process.env.REACT_APP_BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
	const token = Storage.getItem('token');

	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

export const apolloClient = new ApolloClient({
	link: split(
		({ query }) => {
			const definition = getMainDefinition(query);

			return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
		},
		wsLink,
		ApolloLink.from([createOmitTypenameLink(), onErrorLink, authLink.concat(httpLink)]),
	),
	cache: new InMemoryCache(),
});
