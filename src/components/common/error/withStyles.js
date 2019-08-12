import React from 'react';

const styles = {
  container: {},
};

export const withStyles = Component => props => (
  <Component {...props} styles={styles} />
);
export default withStyles;
