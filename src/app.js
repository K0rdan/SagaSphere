// Lib imports
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from 'apollo-boost';
// Custom imports
import { Page } from '@components/common/page/index';
import AppWithNavigationState from './nav';
import { Env, Services } from '@utils/index';
import { defaults, resolvers } from '@gql/index';

const { GRAPHQL_HOST, GRAPHQL_PORT } = Env.getEnv();
const links = [];

// APOLLO ERROR LINK
const apolloCustomErrorLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let sub;
      try {
        sub = forward(operation).subscribe({
          next: ({ data: dataReceived, errors }) => {
            if (errors) {
              data = {
                //...data,
                errors,
              };
            }
            observer.next({ data });
          },
        });
      } catch (e) {
        observer.error(e);
      }

      return () => {
        if (sub) sub.unsubscribe();
      };
    }),
);
links.push(apolloCustomErrorLink);

// APOLLO HTTP LINK
if (GRAPHQL_HOST && GRAPHQL_PORT) {
  const apolloCustomHTTPLink = new HttpLink({
    uri: `http://${GRAPHQL_HOST}:${GRAPHQL_PORT}`,
    includeExtensions: true,
    credentials: 'same-origin',
  });
  links.push(apolloCustomHTTPLink);
} else {
  console.warn(
    `[ENV] GRAPHQL_HOST (${GRAPHQL_HOST}) or GRAPHQL_PORT (${GRAPHQL_PORT}) aren't set. The GraphQL server can't be reached`,
  );
}

// APOLLO CACHE SETUP
const cache = new InMemoryCache();
cache.writeData({ data: defaults });

// APOLLO CLIENT SETUP
const client = new ApolloClient({
  link: ApolloLink.from(links),
  cache,
  resolvers,
});

// APP
export const SagaSphere = () => (
  <ApolloProvider client={client}>
    <Page>
      <AppWithNavigationState
        ref={navigatorRef =>
          Services.NavigationService.setContainer(navigatorRef)
        }
      />
    </Page>
  </ApolloProvider>
);
export default SagaSphere;
