import React from 'react';
import { Colors, Spacing } from '@styles/index';

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
};

export const withStyles = Component => props => (
  <Component {...props} styles={styles} />
);
export default withStyles;
