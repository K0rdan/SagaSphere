// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View } from 'react-native';
// Custom imports
import withDrawer from '@components/common/page/withDrawer';
import withStyles from '@components/common/page/withStyles';
import FooterComponent from '@components/common/footer/index';

export const PageComponent = ({ children, styles }) => (
  <View style={styles.container}>
    <View style={styles.content}>{children}</View>
    <FooterComponent />
  </View>
);

export default compose(
  withDrawer,
  withStyles,
)(PageComponent);
