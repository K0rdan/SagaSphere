// Lib imports
import { combineReducers } from "redux";

// Custom imports
import { NavReducer } from "./nav";
import { AuthReducer } from "./auth";

export const Reducers = combineReducers({
  NavReducer,
  AuthReducer
});

export default Reducers;
