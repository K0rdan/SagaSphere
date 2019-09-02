// Lib imports
import React from 'react';
import { Animated, Easing } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

// Custom imports
import routes from './routes';

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

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: withDefaultProps(routes.Home.route),
    },
    Saga: {
      screen: withDefaultProps(routes.Saga.route),
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    transitionConfig,
  },
);

export default createAppContainer(AppNavigator);
