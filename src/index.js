




import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Provider
import { Provider } from 'react-redux';
import { store } from './service/getdata';
import { getData } from './service/getdata';
import { getRealTimeData } from './service/getrealtimedata';
import { setInterval } from 'timers';

// store.subscribe(() => {
//   console.log(store.getState())
// })

getData();

/**
 * @param setTimeout get blocks and transactions
 */
setTimeout(() => {
  getRealTimeData();
}, 1000);



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

serviceWorker.unregister();
