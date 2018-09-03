
import React from 'react';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

const schema = {
  title: 'Admin Login',
  type: 'object',
  required: ['database', 'email', 'password'],
  properties: {
    database: {
      type: "string",
      title: "Database",
      enum:[
        'local',
        'staging',
        'production',
      ],
      enumNames: [
        'Local',
        'Staging',
        'Production'
      ],
      default: 'local'
    },
    email: {type: "string", title: "Email", default: '' },
    password: {type: "string", title: "Password", default: '' },
  }
};

const uiSchema = {
  'ui:order': [ 'database', 'email', 'password' ],
  database: {},
  email: { 'ui:placeholder': 'Enter your email address' },
  password: { 'ui:widget': 'password', 'ui:placeholder': 'Enter your password' },
}

function log(message) {
  console.log(message);
}

class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schema,
      formData: {}
    }
    this.state.schema.properties.email.default = props.username;
  }

  errors = (errors) => {
    console.log({ errors });
  }

  changed = (changes) => {
    // console.log({ changes });
    // const { formData } = changes;
    // this.setState({ formData });
  }

  authenticate = (data) => {
    // console.log('submit: data:', data.formData);
    const { formData } = data;
    this.setState({ formData });
    this.props.authenticate(formData.email, formData.password, formData.database);
  }

  signInWithGoogle = () => {
    console.log('signInWithGoogle:');
    const url = 'http://localhost:4000/api/v1/auth/google';
    window.location.href = url;
    // fetch(url)
    //   .then(result => {
    //     console.log('result:', result);
    //   })
  }

  render() {
    const { showPassword, formData } = this.state;
    const { message } = this.props;
    return (
      <div className="aligner" style={{height: '200px'}}>
        <div className="aligner-item round-border" style={{width: '400px', textAlign: 'center'}}>
            <h3>WooBoard Admin Login</h3>
            <br/>
            <div id="gSignInWrapper">
              <div id="customBtn" className="customGPlusSignIn" onClick={this.signInWithGoogle}>
                <span className="icon" />
                <span className="buttonText">Sign In With Google</span>
              </div>
            </div>
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
      message: null,
      username: WooAdmin.getUserName(),
    }
  }

  authenticate = (username, password, database) => {
    const { WooAdmin } = this.props;
    this.setState({ message: null, isAuthenticated: false }, () => {
      // console.log('Authentication.authenticate:', { username, password });
      WooAdmin.authenticate(username, password, database)
        .then(result => {
          console.log('WooAdmin.authenticate: result:', result);
          this.setState({ isAuthenticated: true });
        })
        .catch(err => {
          console.log('WooAdmin.authenticate: error:', err);
          this.setState({ isAuthenticated: false, message: 'Your email or password is incorrect. Please try again.'})
        })
    });
  }

  render() {
    const { isAuthenticated, message, username } = this.state;
    if (!isAuthenticated) {
      return <Authenticate authenticate={this.authenticate} message={message} username={username} />
    }

    return this.props.children;
  }
}

export default Authentication;
