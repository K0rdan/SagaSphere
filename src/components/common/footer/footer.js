// Lib imports
import React from 'react';
import { View } from 'react-native';
// Project imports
import FooterButton from '@components/common/footer/footerButton/index';
import withStyles from '@components/common/footer/withStyles';

export const FooterComponent = ({ openDrawer, styles }) => (
  <View style={styles.container}>
    <FooterButton iconName="menu" onPress={openDrawer} />
    <FooterButton iconName="library-music" />
    <FooterButton iconName="settings" />
  </View>
);

export default withStyles(FooterComponent);
