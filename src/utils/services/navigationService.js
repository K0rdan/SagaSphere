// Lib imports
import { BackHandler } from 'react-native';
import { NavigationActions, DrawerActions } from 'react-navigation';

let _container;

const NavigationBack = () => {
  if (NavigationService.getCurrentRoute().routeName !== 'Home') {
    _container.dispatch(NavigationActions.back());
    return true;
  }
  return false;
};

export const NavigationService = {
  setContainer: container => {
    BackHandler.addEventListener('hardwareBackPress', NavigationBack);
    _container = container;
  },
  reset: (routeName, params) =>
    _container.dispatch(
      NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            type: 'Navigation/NAVIGATE',
            routeName,
            params,
          }),
        ],
      }),
    ),
  navigate: (routeName, params) =>
    _container.dispatch(
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        params,
      }),
    ),
  back: NavigationBack,
  getCurrentRoute: () => {
    if (!_container || !_container.state.nav) {
      return {};
    }

    return _container.state.nav.routes[_container.state.nav.index] || null;
  },
  openDrawer: () => _container.dispatch(DrawerActions.openDrawer()),
};

export default NavigationService;
