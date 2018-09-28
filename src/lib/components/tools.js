
import React from 'react';
import Rodal from 'rodal';
import shortid from 'shortid';
import * as mobxReact from 'mobx-react';
import faker from 'faker';

// import { extenderMenuFromDB } from '../../mobx/menuStore';
// import WooAdmin from '../lib/data/wooAdmin';

import NoAccess from './noAccess';

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
    // this.testObject = props.menu.find('charts.posts-by-month');
    const hidden = props.menu.findByPath('hidden');
    this.state = {
      rodalVisible: false,
      hiddenMenu: hidden ? hidden.hide : true,
    }
  }

  // extendMenuFromDB = () => {
  //   extenderMenuFromDB();
  // }
  consoleJwt = () => {
    const { WooAdmin } = this.props;
    console.log('JWT:',WooAdmin.getJwt());
  }
  authProvider = (provider) => {
    const url = `http://localhost:5000/api/v1/auth/${provider}`;
    window.location.href = url;
  }
  googleAuth = () => {
    const provider = 'google';
    this.authProvider(provider)
  }
  aadAuth = () => {
    const provider = 'microsoft';
    const aad = this.authProvider(provider)
  }
  oktaAuth = () => {
    const provider = 'okta';
    this.authProvider(provider)
  }

  addTestString = () => {
    this.props.menu.addTestString(faker.fake('{{hacker.phrase}}'));
  }

  addComponent = (name, props = {}) => {

    const newTab = {
      name,
      component: name,
      id: name,
      ...props,
      config: {},
    };
    // if (data) newTab.data = data;
    this.props.addNode(newTab);
  }

  testFinder = () => this.addComponent('Finder', {data: this.testObject })

  testSqlEditor = () => this.addComponent('SQLEditor', {data: this.testObject.properties.sql, onSave: (sql) => console.log('onSave:', sql.replace(/\s+/g,' '))})

  testResponsive = () => this.addComponent('Responsive');

  testContext = () => this.addComponent('ContextTest');

  queryComparison = () => this.addComponent('QueryComparison');

  // testResponsive = () => {
  //   const newTab = {
  //     component: 'Responsive',
  //     name: `Responsive`,
  //     id: `Responsive`,
  //   }
  //   this.props.addNode(newTab);
  // }

  showUsersQuery = () => {
    // console.log('showUsers props:', this.props);

    const newId = shortid.generate();
    const newTab = {
      component: 'DataTable',
      query: {
        properties: {
          sql: `
          SELECT
            *
          FROM
            users
          `,
          params: [],
          formSchema: null,
        },
        componentOptions: {
          // columnOrder: ['id', 'first_name', 'last_name', 'email_address', 'avatar', 'auth_provider', 'pigs'],
          // use_test_token: true,
        },
      },
      // componentOptions: {
      //   // url: '/users',
      //   columnOrder: ['id', 'first-name', 'last-name', 'email', 'avatar', 'auth-provider', 'pigs'],
      //   use_test_token: true,
      // },
      name: `SSO Query Results (${newId})`,
      id: `SSOQueryResults-${shortid.generate()}`,
    }
    this.props.addNode(newTab);
  }
  showAdminSQL = () => {
    // console.log('showUsers props:', this.props);

    const newId = shortid.generate();
    const newTab = {
      component: 'DataTable',
      query: {
        properties: {
          sql: `
          SELECT
            *
          FROM
            admin_sql
          `,
          params: [],
          formSchema: null,
        },
        componentOptions: {
          columnOrder: [
            'id',
            'menu_path',
            'properties',
            'menu_order',
            'permissions',
            'inserted_at',
            'updated_at',
          ],
        },
      },
      // componentOptions: {
      //   // url: '/users',
      //   columnOrder: ['id', 'first-name', 'last-name', 'email', 'avatar', 'auth-provider', 'pigs'],
      //   use_test_token: true,
      // },
      name: `Admin SQL Results (${newId})`,
      id: `AdminSQLResults-${shortid.generate()}`,
    }
    this.props.addNode(newTab);
  }

  addSomething = () => {
    const phrase = faker.fake('{{hacker.phrase}}');
    const item = {
      key: phrase,
      title: phrase,
      open: false,
      // disabled: true,
      children: [],
    }

    this.props.menu.add(item);
  }

  closeRodal = () => {
    this.setState({ rodalVisible: false });
  }

  showRodal = () => {
    this.setState({ rodalVisible: true });
  }

  hiddenMenu = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      this.props.menu.setHidden(value);
    });
  }

  render() {
    const { props, closeRodal } = this;
    const { posts } = this.props.menu;
    const { rodalVisible, hiddenMenu } = this.state;

    const { WooAdmin } = this.props;
    const buttonRowStyle = {textAlign: 'left', marginBottom: '10px'};
    const buttonStyle = {width: '100%'};

    if (!this.testObject) {
      this.testObject = this.props.menu.find('reports.free_trial');
      // console.assert(this.testObject,'Tools.render: testObject is not set');
    }

    if (!['local'].includes(WooAdmin.getEnvironment())) {
      return (
        <NoAccess />
      )
    }
    return (
      <div style={{padding: '10px'}}>
        {/*<div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.extendMenu}>Extend Menu</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.extendMenuFromDB}>Extend Menu from DB</button>
        </div>*/}

        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.consoleJwt}>Show JWT</button>
        </div>

        {/*<div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.testResponsive}>Responsive</button>
        </div>*/}

        {/*<div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.testFinder}>Finder</button>
        </div>*/}

        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.testSqlEditor}>SQL Editor</button>
        </div>

        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.testContext}>Context Test</button>
        </div>

        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.queryComparison}>Query Comparison</button>
        </div>

        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.showRodal}>Show Rodal</button>
        </div>

        <div style={buttonRowStyle}>
          <label>
            <input
              name="hiddenMenu"
              type="checkbox"
              checked={hiddenMenu}
              onChange={this.hiddenMenu}
            />&nbsp;
            Hidden Menu
          </label>
        </div>

        <div style={buttonRowStyle}>
          {`Posts Count: ${posts.length}`}
        </div>

        <Rodal
            visible={rodalVisible}
            onClose={closeRodal}
            animation="rotate"
            width={800}
            height={500}
        >
          <h1>This is my Rodal Dialog</h1>
          <div>Stuff goes here!</div>
        </Rodal>

        {/*<div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.googleAuth}>Google Auth</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.aadAuth}>AAD Auth</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.oktaAuth}>Okta Auth</button>
        </div>
        <hr/>*/}


        {/*<div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.showUsers}>SSO Users</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.showUsersQuery}>SSO Query Users</button>
        </div>
        <div style={buttonRowStyle}>
          <button style={buttonStyle} onClick={this.showAdminSQL}>Admin SQL</button>
        </div>
        */}
      </div>
    )
  }
}

export default mobxReact.observer(Tools);
