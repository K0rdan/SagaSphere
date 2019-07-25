// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View, Text } from 'react-native';
// Custom imports
import withStyles from '@components/common/sidemenu/withStyles';

export const SideMenuComponent = ({ styles }) => (
  <View style={styles.container}>
    <Text>SideMenu !</Text>
  </View>
);

export default compose(withStyles)(SideMenuComponent);
