// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Project imports
import withStyles from '@components/common/footer/footerButton/withStyles';

export const FooterButtonComponent = ({ iconName, onPress, styles }) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name={iconName} size={styles.size} color={styles.color} />
  </TouchableOpacity>
);

export default compose(withStyles)(FooterButtonComponent);
