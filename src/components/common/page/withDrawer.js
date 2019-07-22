import React from 'react';
import { DrawerLayoutAndroid, View, Text } from 'react-native';

export const withDrawer = Component => props => (
  <DrawerLayoutAndroid
    // ref="drawer"
    drawerWidth={200}
    drawerPosition={DrawerLayoutAndroid.positions.Left}
    renderNavigationView={() => (
      <View>
        <Text>NavigationView!</Text>
      </View>
    )}
  >
    <Component {...props} />
  </DrawerLayoutAndroid>
);

export default withDrawer;
