import { merge } from 'lodash';
import Saga from '@gql/Saga/index';

export const defaults = merge(Saga.defaults);

export const resolvers = {
  Mutation: merge(Saga.resolvers),
};

export const gql = {
  resolvers,
  defaults,
};

export default gql;
