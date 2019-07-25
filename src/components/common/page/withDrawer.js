import React from 'react';
import { Dimensions } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { SideMenu } from '@components/common/sidemenu/index';
import { Spacing } from '@styles/index';

const buttonSize = 40 + 2 * Spacing.defaultPadding;
const drawerWidth = Dimensions.get('window').width - buttonSize;

export const withDrawer = Component => props => (
  <DrawerLayout
    // ref="drawer"
    drawerType={'slide'}
    drawerWidth={drawerWidth}
    edgeWidth={20}
    drawerPosition={DrawerLayout.positions.Left}
    overlayColor={'rgba(0,0,0,0.5)'}
    statusBarAnimation={'slide'}
    renderNavigationView={() => <SideMenu />}
  >
    <Component {...props} />
  </DrawerLayout>
);

export default withDrawer;
