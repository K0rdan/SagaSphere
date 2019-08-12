// Lib imports
import React from 'react';
import { View, Text } from 'react-native';
// Project imports
import withStyles from '@components/common/footer/withStyles';

export const ErrorComponent = ({ styles }) => (
  <View style={styles.container}>
    <Text>Error</Text>
  </View>
);

export default withStyles(ErrorComponent);
