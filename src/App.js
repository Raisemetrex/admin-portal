import React, { Component } from 'react';
// import './App.css';
// import '../node_modules/flexlayout-react/style/light.css';
import 'flexlayout-react/style/light.css';

// import WooAdmin from './lib/data/wooAdmin';

import Layout from './flexlayout/layout';
import Authentication from './lib/components/authentication';

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
    const extra = {
      setEnvironment,
      environment,
    };
    return (
      <div className="App">
        <Authentication WooAdmin={WooAdmin} {...extra}>
          <Layout WooAdmin={WooAdmin} {...extra} />
        </Authentication>
      </div>
    );
  }
}

export default App;
