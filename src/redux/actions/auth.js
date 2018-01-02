import { AsyncStorage } from "react-native";

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

export const retrieveUser = () => (dispatch) => {
  dispatch(loggingIn());
  return AsyncStorage.getItem("user")
    .then((user) => {
      if (user !== null) {
        dispatch({
          type: LOGGED_IN,
          user: JSON.parse(user)
        });
      }
    });
};

export const AuthActions = {
  LOGGING_IN,
  LOGGING_OUT,
  LOGGED_IN,
  retrieveUser
};

export default AuthActions;
