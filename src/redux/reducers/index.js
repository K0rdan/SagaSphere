// Lib imports
import { combineReducers } from "redux";

// Custom imports
import { NavReducer } from "./nav";
import { AuthReducer } from "./auth";
import { PlayerReducer } from "./player";

export const Reducers = combineReducers({
  NavReducer,
  AuthReducer,
  PlayerReducer
});

export default Reducers;
