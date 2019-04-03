import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// Provider
import { Provider } from 'react-redux';
import { store } from './service/service';
import { getData } from './service/service';

// store.subscribe(() => {
//   console.log(store.getState())
// })

getData();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

serviceWorker.unregister();
