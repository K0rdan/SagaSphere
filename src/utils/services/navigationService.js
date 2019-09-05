import { NavigationActions } from 'react-navigation';

let _container;

export const NavigationService = {
  setContainer: container => (_container = container),
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
  getCurrentRoute: () => {
    if (!_container || !_container.state.nav) {
      return {};
    }

    return _container.state.nav.routes[_container.state.nav.index] || null;
  },
};

export default NavigationService;
