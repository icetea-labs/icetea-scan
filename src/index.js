import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Provider
import { Provider } from "react-redux";
// import { store } from "./service/blockchain/init-store";
import store from "./service/store";
import { getRealTimeData } from "./service/blockchain/get-realtime-data";
import { env } from "./evironment/env";

const times = 1000;

if (env === "testing") {
  setTimeout(() => {
    getRealTimeData();
  }, times);
} else {
  setTimeout(() => {
    getRealTimeData();
  }, 1);
  setInterval(() => {
    getRealTimeData();
  }, times);
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
