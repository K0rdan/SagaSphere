import React from 'react';
import { Colors } from '@styles/index';

const styles = {
  size: 40,
  color: Colors.secondary,
};

export const withStyles = Component => props => (
  <Component {...props} styles={styles} />
);
export default withStyles;
