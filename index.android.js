// Lib imports
import React from "react";
import {
  AppRegistry,
  Text,
} from "react-native";
import { StackNavigator } from "react-navigation";
// Custom imports
import routes from "./src/routes";

const SagaSphere = StackNavigator({
  Home: { screen: routes.Home }
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
});

AppRegistry.registerComponent("SagaSphere", () => SagaSphere);