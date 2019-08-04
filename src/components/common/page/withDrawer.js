import React from 'react';
import { Dimensions } from 'react-native';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { SideMenu } from '@components/common/sidemenu/index';
import { Spacing } from '@styles/index';

const drawerRef = React.createRef();
const buttonSize =
  Spacing.footer.button.size + 2 * Spacing.footer.button.padding;
const drawerWidth = Dimensions.get('window').width - buttonSize;

export const withDrawer = Component =>
  React.forwardRef(props => (
    <DrawerLayout
      ref={drawerRef}
      drawerType={'slide'}
      drawerWidth={drawerWidth}
      edgeWidth={20}
      drawerPosition={DrawerLayout.positions.Left}
      overlayColor={'rgba(0,0,0,0.5)'}
      statusBarAnimation={'slide'}
      renderNavigationView={() => <SideMenu />}
    >
      <Component {...props} drawer={drawerRef} />
    </DrawerLayout>
  ));

export default withDrawer;
