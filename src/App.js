import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';
import 'flexlayout-react/style/light.css';

import FirstLayout from './flexlayout/test1';

import PhoenixData from './lib/PhoenixData';

PhoenixData.authenticate('slack@reffind.com', 'slack')
  .then(result => {
    // console.log('auth result:', result);
    // console.log('result cookie:', result.headers.get('set-cookie'));
    // console.log('document.cookie:', document.cookie);
    // console.log('PhoenixData: result:', result);
    PhoenixData.listUsers();
  });

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
