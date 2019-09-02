import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const SAGA_QUERY = gql`
  query Saga($id: ID!) {
    saga(id: $id) @client {
      id
      name
      __typename
    }
  }
`;
export const withSagaQuery = graphql(SAGA_QUERY, { name: 'sagaData' });

export const queries = {
  SAGA_QUERY,
  withSagaQuery,
};

export default queries;
