import React from 'react';
import ReactDOM from 'react-dom';

import 'flexlayout-react/style/light.css';
import 'react-table/react-table.css';
import 'jsoneditor/dist/jsoneditor.min.css';
import 'codemirror/lib/codemirror.css';

import './index.css';
import './css/account.css';
import './css/finder.css';
import './css/codemirror.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import WooAdmin from './lib/data/wooAdmin';

// NOTE: just testing the JSON conversion by importing the module
import * as jsonApiTest from './lib/components/test/testJsonApi';


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
