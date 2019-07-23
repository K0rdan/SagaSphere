import React from 'react';
import { Colors, Spacing } from '@styles/index';

const button = {
  size: 40,
  color: Colors.secondary,
};

const styles = {
  container: {
    flexDirection: 'row',
    height: Spacing.footer.height,
    backgroundColor: Colors.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Spacing.defaultPadding,
    paddingRight: Spacing.defaultPadding,
  },
  button,
};

export const withStyles = Component => props => {
  return <Component {...props} styles={styles} />;
};

export default withStyles;
