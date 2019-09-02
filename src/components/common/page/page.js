// Lib imports
import React from 'react';
import { View } from 'react-native';
// Custom imports
import withDrawer from '@components/common/page/withDrawer';
import withStyles from '@components/common/page/withStyles';
import FooterComponent from '@components/common/footer/index';

export const PageComponent = ({ children, drawer, styles }) => (
  <View style={styles.container}>
    {React.cloneElement(children, {
      screenProps: { defaultStyles: styles.content },
    })}
    <FooterComponent openDrawer={() => drawer.current.openDrawer()} />
  </View>
);

export default withDrawer(withStyles(PageComponent));
