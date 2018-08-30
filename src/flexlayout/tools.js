
import React from 'react';
import shortid from 'shortid';

import { extender } from '../mobx/menuStore';
import WooAdmin from '../lib/data/wooAdmin';


function oauthPopup(url) {
  const windowArea = {
    width: 600,
    height: 630,
  };

  windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
  windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));

  const sep = (url.indexOf('?') !== -1) ? '&' : '?';
  const popupurl = `${url}${sep}`;
  const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
    width=${windowArea.width},height=${windowArea.height},
    left=${windowArea.left},top=${windowArea.top}`;

  const authWindow = window.open(popupurl, 'oauthPopup', windowOpts);
  // Create IE + others compatible event handler
  const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  const eventer = window[eventMethod];
  const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

  authWindow.addEventListener('load', () => {
    console.log('loaded')
  }, true);

  // Listen to message from child window
  const authPromise = new Promise((resolve, reject) => {
    console.log('created promise for popup:', {
      eventMethod,
      messageEvent,
      eventer,
    });
    eventer(messageEvent, (e) => {
      console.log('messageEvent:', e);

      if (e.origin !== window.SITE_DOMAIN) {
        authWindow.close();
        reject('Not allowed');
      }

      if (e.data.auth) {
        resolve(JSON.parse(e.data.auth));
        authWindow.close();
      } else {
        authWindow.close();
        reject('Unauthorised');
      }
    }, false);
  });

  return authPromise;
};

// export default popup;

// On Server view after response
// window.opener.postMessage(
//   { auth: { token: access_token } },
//   window.opener.location
// );

// window.opener.postMessage(
//   { error: 'Login failed' },
//   window.opener.location
// );

class Tools extends React.Component {
  constructor(props) {
    super(props);
  }
  extendMenu = () => {
    extender();
  }
  consoleJwt = () => {
    console.log('JWT:',WooAdmin.getJwt());
  }
  consoleTestJwt = () => {
    console.log('Test JWT:',WooAdmin.getTestJwt());
  }
  authProvider = (provider) => {

    const url = `http://localhost:5000/api/v1/auth/${provider}`;

    // return oauthPopup(url);

    window.location.href = url;

    // return fetch(url,{
    //   method: 'GET',
    // })
    // .then(result => {
    //   return result.json();
    // })
  }
  googleAuth = () => {
    const provider = 'google';
    this.authProvider(provider)
      // .then(result => {
      //   console.log(`${provider} auth: jwt:`, result);
      // })
  }
  aadAuth = () => {
    const provider = 'microsoft';
    const aad = this.authProvider(provider)
      // .then(result => {
      //   console.log(`${provider} auth: jwt:`, result);
      // });
  }
  oktaAuth = () => {
    const provider = 'okta';
    this.authProvider(provider)
      // .then(result => {
      //   console.log(`${provider} auth: jwt:`, result);
      // })
  }
  showUsers = () => {
    // console.log('showUsers props:', this.props);

    const newId = shortid.generate();
    const newTab = {
      component: 'RestTable',
      componentOptions: {
        url: '/users',
        columnOrder: ['id', 'first-name', 'last-name', 'email', 'avatar', 'auth-provider', 'pigs'],
      },
      name: `SSO Results (${newId})`,
      id: `SSOResults-${shortid.generate()}`,
    }
    this.props.addNode(newTab);
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
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.consoleTestJwt}>Show Test JWT</button>
        </div>
        <hr/>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.googleAuth}>Google Auth</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.aadAuth}>AAD Auth</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.oktaAuth}>Okta Auth</button>
        </div>
        <hr/>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.showUsers}>Quick Test - SSO Users</button>
        </div>
      </div>
    )
  }
}

export default Tools;
