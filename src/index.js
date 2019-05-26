import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Provider
import { Provider } from 'react-redux';
import { store } from "./service/init-store";
import { getRealTimeData }  from './service/get-realtime-data';


setInterval(() => { getRealTimeData(); }, 1000);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

serviceWorker.unregister();
