// Lib imports
import React from "react";
import { AppRegistry } from "react-native";
import { StackNavigator } from "react-navigation";
// Custom imports
import routes from "./src/routes";

const SagaSphere = StackNavigator({
  Home: { screen: routes.Home },
  UserSagas: { screen: routes.UserSagas }
}, {
  headerMode: "none",
  initialRouteName: "Home"
});

AppRegistry.registerComponent("SagaSphere", () => SagaSphere);