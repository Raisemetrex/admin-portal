
import React from 'react';

import { extender } from '../mobx/menuStore';
import WooAdmin from '../lib/data/wooAdmin';

class Tools extends React.Component {
  extendMenu = () => {
    extender();
  }
  consoleJwt = () => {
    console.log('JWT:',WooAdmin.getJwt());
  }
  render() {
    const buttonRowStyle = {textAlign: 'left', marginBottom: '10px'};
    const buttonStyle = {width: '100%'};
    return (
      <div style={{padding: '10px'}}>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.extendMenu}>Extend Menu</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.consoleJwt}>Show JWT</button>
        </div>
      </div>
    )
  }
}

export default Tools;
