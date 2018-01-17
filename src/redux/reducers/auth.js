import { AuthActions } from "./../actions/";

const initialAuthState = {
  error: null,
  user: null
};

export const AuthReducer = (state = initialAuthState, action) => {
  const { type, error, user } = action;
  switch (type) {
    case AuthActions.LOGGING_IN:
      return state;
    case AuthActions.LOGGING_OUT:
      return initialAuthState;
    case AuthActions.LOGGED_IN:
      return { ...state, user };
    case AuthActions.LOGGING_ERROR:
      return { ...state, error };
    default:
      return state;
  }
};

export default AuthReducer;
