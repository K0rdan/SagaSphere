// Lib imports
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
// Custom imports
import { Reducers } from "./reducers";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

export const configureStore = () => createStore(
  Reducers,
  applyMiddleware(...middleware)
);

export default configureStore;
