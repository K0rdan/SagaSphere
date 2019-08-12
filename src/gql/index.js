import { merge } from 'lodash';
import Saga from '@gql/Saga/index';
import SagaList from '@gql/SagaList/index';

export const defaults = merge(Saga.defaults, SagaList.defaults);

export const resolvers = {
  Mutation: merge(Saga.resolvers, SagaList.resolvers),
};

export const gql = {
  resolvers,
  defaults,
};

export default gql;
