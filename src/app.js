// Lib imports
import React from "react";
import { Provider } from "react-redux";

// Custom imports
import { configureStore } from "./redux/configureStore";
import AppWithNavigationState from "./nav";

// APP
const store = configureStore();
export const SagaSphere = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default SagaSphere;
