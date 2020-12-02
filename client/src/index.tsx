import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { InjectedApp } from './app/App';
import { Provider } from 'mobx-react';
import { actions } from './utils/Actions';
import { stores } from './utils/Stores';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <Provider
    {...stores}
    {...actions}
  >
    <BrowserRouter>
      <InjectedApp/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
