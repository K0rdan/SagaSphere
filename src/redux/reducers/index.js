// Lib imports
import { combineReducers } from "redux";

// Custom imports
import { NavReducer } from "./nav";
import { NotificationReducer } from "./notification";
import { AuthReducer } from "./auth";
import { PlayerReducer } from "./player";

export const Reducers = combineReducers({
  NavReducer,
  NotificationReducer,
  AuthReducer,
  PlayerReducer
});

export default Reducers;
