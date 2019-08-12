// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
// Project imports
import withStyles from '@components/common/footer/withStyles';

export const LoaderComponent = ({ styles }) => (
  <View style={styles.container}>
    <Text>Loader</Text>
  </View>
);

export default withStyles(LoaderComponent);
