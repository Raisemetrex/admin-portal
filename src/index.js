import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'react-table/react-table.css';
import 'jsoneditor/dist/jsoneditor.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import WooAdmin from './lib/data/wooAdmin';

const url = new URL(window.location.href);
const access_token = url.searchParams.get('access_token');

if (access_token) {
  console.log('WooAdmin.environment', WooAdmin.environment);
  console.log('access_token:', access_token);
  WooAdmin.setAccessToken(access_token);
  window.location.href = `${url.origin}/#`;
// } else if (WooAdmin.isAuthenticated()) {
//   WooAdmin.me()
//     .then(result => {
//       console.log('me:', result && result.length ? result[0] : {empty: true});
    // })
}

ReactDOM.render(<App WooAdmin={WooAdmin}/>, document.getElementById('root'));
registerServiceWorker();
