import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';

// import WooAdmin from './lib/data/wooAdmin';

import Layout from './flexlayout/layout';
import Authentication from './lib/components/authentication';
import menu from './mobx/menuStore';

import Context from './lib/context/context';
import DataStore from './lib/context/dataStore';

import FactoryComponents from './lib/components/factoryComponents';

class App extends Component {
  constructor(props) {
    super(props);
    const { WooAdmin } = props;
    this.state = {
      environment: WooAdmin.getEnvironment(),
    };
  }
  setEnvironment = environment => {
    this.setState({ environment }, () => {
      console.log('App.setEnvironment: state:', this.state);
    });
  }
  render() {
    const { setEnvironment } = this;
    const { WooAdmin } = this.props;
    const { environment } = this.state;
    const globalProps = {
      setEnvironment,
      environment,
      WooAdmin,
      menu,
      DataStore,
    };
    return (
      <div className="App">
        <Context>
          <Authentication {...globalProps}>
            <Layout {...globalProps} />
          </Authentication>
        </Context>
      </div>
    );
  }
}

export default App;
