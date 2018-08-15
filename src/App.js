import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';
import 'flexlayout-react/style/light.css';

import FirstLayout from './flexlayout/test1';
import Authentication from './lib/components/authentication';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Authentication>
          <FirstLayout />
        </Authentication>
      </div>
    );
  }
}

export default App;
