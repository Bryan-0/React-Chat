import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppRouter from './components/AppRouter';

import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
