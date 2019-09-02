import React from 'react';
import { Colors } from '@styles/index';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight, // Default color behind AppNavigator
  },
  content: {
    flex: 1,
    backgroundColor: Colors.primaryLight, // Default content color
  },
};

export const withStyles = Component => props => (
  <Component {...props} styles={styles} />
);

export default withStyles;
