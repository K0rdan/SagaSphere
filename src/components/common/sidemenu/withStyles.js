import React from 'react';
import { Colors, Spacing } from '@styles/index';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  header: {
    margin: 10,
  },
  sectionWrapper: {
    height: Spacing.sidemenu.section.height,
    padding: Spacing.defaultSpacing,
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: Colors.primaryLight,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    size: 45,
    color: Colors.primaryLight,
  },
  text: {
    color: Colors.primaryText,
  },
};

export const withStyles = Component => props => (
  <Component {...props} styles={styles} />
);

export default withStyles;
