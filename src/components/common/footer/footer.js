// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Project imports
import withStyles from '@components/common/footer/withStyles';

const FooterButton = ({ iconName, styles }) => (
  <TouchableOpacity>
    <Icon name={iconName} size={styles.size} color={styles.color} />
  </TouchableOpacity>
);

export const FooterComponent = ({ styles }) => (
  <View style={styles.container}>
    <FooterButton iconName="menu" styles={styles.button} />
    <FooterButton iconName="library-music" styles={styles.button} />
    <FooterButton iconName="settings" styles={styles.button} />
  </View>
);

export default compose(withStyles)(FooterComponent);
