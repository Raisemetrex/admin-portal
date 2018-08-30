import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';
import 'flexlayout-react/style/light.css';

import WooAdmin from './lib/data/wooAdmin';

import FirstLayout from './flexlayout/layout';
import Authentication from './lib/components/authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authentication WooAdmin={WooAdmin}>
          <FirstLayout WooAdmin={WooAdmin}/>
        </Authentication>
      </div>
    );
  }
}

export default App;
