import React from 'react';
import { Colors } from '@styles/index';

const styles = {
  container: {
    height: 50,
    backgroundColor: Colors.primaryLight,
  },
};

export const withStyles = Component => props => {
  return <Component {...props} styles={styles} />;
};

export default withStyles;
