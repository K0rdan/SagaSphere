// Lib imports
import { NavigationActions } from "react-navigation";
import { find } from "lodash";

// Custom imports
import { AppNavigator } from "./../../nav";
import routes from "./../../routes";

export const NavReducer = (state, action) => {
  const { type, routeName, routeParams } = action;
  let newState;
  switch (type) {
    case "Navigation/NAVIGATE":
      if (find(routes, route => route.routeName === routeName)) {
        newState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName, params: routeParams }),
          state
        );
      }
      break;
    default:
      newState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return newState || state;
};

export default NavReducer;
