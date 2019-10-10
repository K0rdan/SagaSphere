// Lib imports
import React from 'react';
import { Dimensions, Animated, Easing } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Custom imports
import { Spacing } from '@styles/index';
import { SideMenu } from '@components/common/sidemenu/index';
import { Footer } from '@components/common/footer/index';
import routes from './routes';

const buttonSize =
  Spacing.footer.button.size + 2 * Spacing.footer.button.padding;
const drawerWidth = Dimensions.get('window').width - buttonSize;

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      });

      return { transform: [{ translateX }] };
    },
  };
};

const withDefaultProps = Component => ({ navigation, screenProps }) => (
  <Component navigation={navigation} {...screenProps} />
);

// Common screens
const HomeScreen = withDefaultProps(routes.Home.route);
const LibraryScreen = withDefaultProps(routes.Library.route);

// Stack specific screens
const SagaScreen = withDefaultProps(routes.Saga.route);

// Stacks
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Saga: {
      screen: SagaScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig,
  },
);

// Page navigator
const createPageNavigator = route =>
  createBottomTabNavigator(route, {
    tabBarComponent: ({ navigation }) => (
      <Footer openDrawer={() => navigation.openDrawer()} />
    ),
  });

// Home navigator
const HomeNavigator = createPageNavigator({
  Home: {
    screen: HomeStack,
  },
});

// Library navigator
const LibraryNavigator = createPageNavigator({
  Library: {
    screen: LibraryScreen,
  },
});

// Base navigator
export const AppNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator, //HomeStack,
    },
    Library: {
      screen: LibraryNavigator,
    },
  },
  {
    contentComponent: ({ navigation, screenProps }) => (
      <SideMenu drawer={navigation} {...screenProps} />
    ),
    drawerType: 'slide',
    drawerWidth,
    edgeWidth: 50,
    drawerPosition: 'left',
    overlayColor: 'rgba(0,0,0,0.5)',
  },
);

export default createAppContainer(AppNavigator);
