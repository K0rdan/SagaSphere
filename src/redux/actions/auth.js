// Lib imports
import { AsyncStorage } from "react-native";
// Custom imports
import { Config, Lang } from "./../../utils/";

export const LOGGING_IN = "LOGGING_IN";
export const loggingIn = () => ({
  type: LOGGING_IN
});

export const LOGGED_IN = "LOGGED_IN";
export const loggedIn = user => ({
  type: LOGGED_IN,
  user
});

export const LOGGING_OUT = "LOGGING_OUT";
export const loggingOut = () => ({
  type: LOGGING_OUT,
  user: null
});

export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const logoutError = error => ({
  type: LOGOUT_ERROR,
  error,
  user: null
});

export const LOGGING_ERROR = "LOGGING_ERROR";
export const loggingError = error => ({
  type: LOGGING_ERROR,
  error,
  user: null
});

export const retrieveUser = () => async (dispatch) => {
  dispatch(loggingIn());
  try {
    const user = await AsyncStorage.getItem("user");
    if (user === null) {
      return dispatch({
        type: LOGGING_ERROR,
        error: Lang[Config.Lang].Errors.Login.NotAuthenticated
      });
    }
    return dispatch({ type: LOGGED_IN, user: JSON.parse(user) });
  } catch (error) {
    return dispatch({
      type: LOGGING_ERROR,
      error: Lang[Config.Lang].Errors.Login.NotAuthenticated
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(loggingOut());
    await AsyncStorage.removeItem("user");
    return dispatch({
      type: "LOGOUT",
      user: null
    });
  } catch (error) {
    return dispatch({
      type: LOGOUT_ERROR,
      error: Lang[Config.Lang].Errors.Login.NotAuthenticated
    });
  }
};

export const AuthActions = {
  LOGGING_IN,
  LOGGING_OUT,
  LOGGED_IN,
  LOGGING_ERROR,
  retrieveUser,
  logout
};

export default AuthActions;
