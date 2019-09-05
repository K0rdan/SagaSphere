import React from 'react';
import { Colors, Spacing } from '@styles/index';

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDark,
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: Colors.primaryLight,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Spacing.sidemenu.section.height,
  },
  sectionFirst: {
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: Colors.primaryLight,
  },
  sectionActive: {
    backgroundColor: Colors.primaryDark,
  },
  sectionActiveSpan: {
    width: Spacing.tiny,
    height: '100%',
    marginRight: Spacing.small,
    backgroundColor: Colors.secondary,
  },
  sectionRipple: {
    color: Colors.primaryDark,
  },
  sectionIcon: {
    size: 40,
    color: Colors.primaryLight,
  },
  sectionIconActive: {
    color: Colors.secondary,
  },
  sectionText: {
    marginLeft: Spacing.large,
    color: Colors.primaryText,
  },
};

export const withStyles = Component => props => (
  <Component {...props} styles={styles} />
);

export default withStyles;
