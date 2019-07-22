// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Project imports
import withStyles from '@components/common/footer/withStyles';

export const FooterComponent = ({ styles }) => (
  <View style={styles.container}>
    <TouchableOpacity>
      <Icon name="menu" size={styles.buttonSize} color={styles.buttonColor} />
    </TouchableOpacity>
  </View>
);

export default compose(withStyles)(FooterComponent);
