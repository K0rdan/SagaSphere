// Lib imports
import { createAppContainer, createStackNavigator } from 'react-navigation';

// Custom imports
import routes from './routes';

export const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: routes.Home.route,
    },
    Saga: {
      screen: routes.Saga.route,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default createAppContainer(AppNavigator);
