
import React from 'react';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

// import WooAdmin from '../data/wooAdmin';

// const schema = {
//   title: 'Admin Login',
//   type: 'object',
//   required: ['database', 'email', 'password'],
//   properties: {
//     database: {
//       type: "string",
//       title: "Database",
//       enum:[
//         'local',
//         'staging',
//         'production',
//       ],
//       enumNames: [
//         'Local',
//         'Staging',
//         'Production'
//       ],
//       default: 'local'
//     },
//     email: {type: "string", title: "Email", default: '' },
//     password: {type: "string", title: "Password", default: '' },
//   }
// };
//
// const uiSchema = {
//   'ui:order': [ 'database', 'email', 'password' ],
//   database: {},
//   email: { 'ui:placeholder': 'Enter your email address' },
//   password: { 'ui:widget': 'password', 'ui:placeholder': 'Enter your password' },
// }

function log(message) {
  console.log(message);
}

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    const { WooAdmin } = props;
    this.state = {
      // schema,
      // formData: {},
      environment: WooAdmin.getEnvironment(),
    };
    // this.state.schema.properties.email.default = props.username;
  }

  componentWillReceiveProps(newProps) {
    const { state: oldProps } = this;
    if (newProps.environment !== oldProps.environment) {
      console.log('new environment:', newProps.environment);
    }
  }

  errors = (errors) => {
    console.log({ errors });
  }

  changed = (changes) => {
    // console.log({ changes });
    // const { formData } = changes;
    // this.setState({ formData });
  }

  // authenticate = (data) => {
  //   // console.log('submit: data:', data.formData);
  //   const { formData } = data;
  //   this.setState({ formData });
  //   this.props.authenticate(formData.email, formData.password, formData.database);
  // }

  signInWithGoogle = () => {
    console.log('signInWithGoogle:');
    const { WooAdmin } = this.props;
    WooAdmin.setEnvironment(this.state.environment);
    const endpoint = WooAdmin.getEndpoint();
    const url = `${endpoint}/auth/google`; // 'http://localhost:4000/api/v1/auth/google';
    window.location.href = url;
  }

  selectEnvironment = (e) => {
    const { target } = e;
    const { value: environment } = target;
    this.setState({ environment }, () => {
      console.log({ state: this.state });
    });
  }

  checkError = () => {
    let result = null;
    const url = new URL(window.location.href);
    const error = url.searchParams.get('error');
    if (error && error === 'unauthorized') {
      result = (
        <div style={{textAlign: 'left', marginTop: '20px'}}>
          <ul style={{color: 'red', fontWeight: 'bold'}}>
            <li>Error: Unauthorized</li>
          </ul>
          <p>Check with the Administrator if you believe you should have access.</p>
        </div>
      )
    }
    return result;
  }

  render() {
    const { showPassword, formData } = this.state;
    const { message } = this.props;
    const error = this.checkError();
    return (
      <div className="aligner" style={{height: '600px'}}>
        <div className="aligner-item round-border" style={{width: '400px', textAlign: 'center'}}>
            <h3>WooBoard Admin Login</h3>
            <br/>
            <div>
              <label>Environment: &nbsp;</label>
              <select onChange={this.selectEnvironment}>
                <option value="local">Local</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
            <br/>
            <div id="gSignInWrapper">
              <div id="customBtn" className="customGPlusSignIn" onClick={this.signInWithGoogle}>
                <span className="icon" />
                <span className="buttonText">Sign In With Google</span>
              </div>
            </div>
            {error}
        </div>
      </div>
    )
  }
}

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    const { WooAdmin } = this.props;
    this.state = {
      isAuthenticated: WooAdmin.isAuthenticated(),
      environment: WooAdmin.getEnvironment(),
      message: null,
      username: WooAdmin.getUserName(),
    }
  }

  componentWillReceiveProps(newProps) {
    const { props: oldProps } = this;
    if (newProps.environemnt !== oldProps.environment) {
      // console.log('new props:', { newProps, oldProps: this.props });
      console.log('new environment:', newProps.environent);
    }
  }

  render() {
    const { isAuthenticated, message, username } = this.state;
    if (!isAuthenticated) {
      const { WooAdmin } = this.props;
      return <Authenticate authenticate={this.authenticate} message={message} username={username} WooAdmin={WooAdmin} />
    }
    return this.props.children;
  }
}

export default Authentication;
