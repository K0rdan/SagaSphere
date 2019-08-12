import gql from 'graphql-tag';

export const SAGALIST_QUERY = gql`
  query SagaList {
    sagas @client {
      id
      name
      __typename
    }
  }
`;

export const queries = {
  SAGALIST_QUERY,
};

export default queries;
