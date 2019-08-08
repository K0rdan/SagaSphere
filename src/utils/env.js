import { reduce } from 'lodash';

export const getEnv = () =>
  reduce(
    process.env,
    (acc, val, key) =>
      Object.assign(
        {},
        acc,
        { [key]: val },
      ),
    {},
  );

export const Env = {
  getEnv,
};

export default Env;
