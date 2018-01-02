import { AuthActions } from "./../actions/";

const initialAuthState = {
  user: null
};

export const AuthReducer = (state = initialAuthState, action) => {
  console.log("AuthReducer", state, action);
  const { type, user } = action;
  switch (type) {
    case AuthActions.LOGGING_IN:
      return state;
    case AuthActions.LOGGING_OUT:
      return initialAuthState;
    case AuthActions.LOGGED_IN:
      return { ...state, user };
    default:
      return state;
  }
};

export default AuthReducer;
