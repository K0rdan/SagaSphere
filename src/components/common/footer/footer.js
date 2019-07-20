// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View, Text } from 'react-native';
// Project imports
import withStyles from '@components/common/footer/withStyles';

export const FooterComponent = ({ styles }) => (
  <View style={styles.container}>
    <Text>Footer</Text>
  </View>
);

export default compose(withStyles)(FooterComponent);
