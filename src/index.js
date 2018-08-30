import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import WooAdmin from './lib/data/wooAdmin';

const url = new URL(window.location.href);
const access_token = url.searchParams.get('access_token');

if (access_token) {
  // console.log('access_token:', access_token);
  WooAdmin.setTestToken(access_token);
  window.location.href = `${url.origin}/#`;
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
