// Lib imports
import React from "react";
import PropTypes from "prop-types";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";

// Custom imports
import { Config, Lang } from "./utils";
import routes from "./routes";

export const AppNavigator = StackNavigator({
  Home: { screen: routes.Home.route, navigationOptions: { title: Lang[Config.Lang].Menu.Home } },
  Login: { screen: routes.Login.route, navigationOptions: { title: Lang[Config.Lang].Menu.User.Login } },
  SagaList: { screen: routes.SagaList.route, navigationOptions: { title: Lang[Config.Lang].Menu.SagaList } },
  SagaDetails: { screen: routes.SagaDetails.route },
  Player: { screen: routes.Player.route },
  News: { screen: routes.News.route, navigationOptions: { title: Lang[Config.Lang].Menu.News } },
  Feeds: { screen: routes.Feeds.route, navigationOptions: { title: Lang[Config.Lang].Menu.User.Feeds } }
}, {
  headerMode: "none"
});

const AppWithNavigationState = ({ dispatch, NavReducer }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: NavReducer })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  NavReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(AppWithNavigationState);
