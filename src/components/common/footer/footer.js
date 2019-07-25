// Lib imports
import React from 'react';
import { compose } from 'react-apollo';
import { View } from 'react-native';
// Project imports
import FooterButton from '@components/common/footer/footerButton/index';
import withStyles from '@components/common/footer/withStyles';

export const FooterComponent = ({ styles }) => (
  <View style={styles.container}>
    <FooterButton iconName="menu" />
    <FooterButton iconName="library-music" />
    <FooterButton iconName="settings" />
  </View>
);

export default compose(withStyles)(FooterComponent);
