// Lib imports
import { createAppContainer, createStackNavigator } from 'react-navigation';

// Custom imports
import routes from './routes';

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: routes.Home.route,
      navigationOptions: { title: 'TEST' },
    },
    // Login: {
    //   screen: routes.Login.route,
    //   navigationOptions: { title: Lang[Config.Lang].Menu.User.Login },
    // },
    // SagaList: {
    //   screen: routes.SagaList.route,
    //   navigationOptions: { title: Lang[Config.Lang].Menu.SagaList },
    // },
    // SagaDetails: { screen: routes.SagaDetails.route },
    // Player: { screen: routes.Player.route },
    // News: {
    //   screen: routes.News.route,
    //   navigationOptions: { title: Lang[Config.Lang].Menu.News },
    // },
    // Feeds: {
    //   screen: routes.Feeds.route,
    //   navigationOptions: { title: Lang[Config.Lang].Menu.User.Feeds },
    // },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
