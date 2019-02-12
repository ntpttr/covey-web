import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import React from 'react';

import { store } from './helpers';
import { App } from './components';

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));