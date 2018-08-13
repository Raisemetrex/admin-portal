import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';
import 'flexlayout-react/style/light.css';

import FirstLayout from './flexlayout/test1';

// import PhoenixData from './lib/PhoenixData';

import PhoenixAuth from './lib/PhoenixAuth';

// const q1 = {
//   params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
//   sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
// };

// const q2 = {
//   params: [],
//   sql: 'SELECT * FROM users',
// };

PhoenixAuth.authenticate('gary@reffind.com', 'R3ff1nd!2017')
  // .then(() => PhoenixAuth.query(q2))
  // .then(result => {
  //   console.log('query result:', result);
  // })
  .catch(err => console.log('authenticate error:', err));

// PhoenixAuth.test()
//   .then(() => {
//     const q = {
//       params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
//       sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
//     }
//     PhoenixAuth.testQuery(q.sql, q.params);
//   })
//

// PhoenixData.listUsers();

// PhoenixData.authenticate('slack@reffind.com', 'slack')
//   .then(result => {
//     // console.log('auth result:', result);
//     // console.log('result cookie:', result.headers.get('set-cookie'));
//     console.log('document.cookie:', document.cookie);
//     // console.log('PhoenixData: result:', result);
//     PhoenixData.listUsers();
//   });

class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <FirstLayout />
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
