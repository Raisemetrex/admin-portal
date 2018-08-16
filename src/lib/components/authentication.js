
import React from 'react';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

const schema = {
  title: 'Admin Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {type: "string", title: "Email", default: '' },
    password: {type: "string", title: "Password", default: '' },
  }
};

const uiSchema = {
  'ui:order': [ 'email', 'password' ],
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
    }
  }

  errors = (errors) => {
    console.log({ errors });
  }

  changed = (changes) => {
    // console.log({ changes });
  }

  authenticate = (data) => {
    console.log('submit: data:', data);
    this.props.authenticate(data.formData.email, data.formData.password);
  }

  render() {
    const { showPassword } = this.state;
    const { message } = this.props;
    return (
      <div className="aligner" style={{height: '400px'}}>
        <div className="aligner-item round-border">

          <Form
            className="form form-wide"
            schema={schema}
            uiSchema={uiSchema}
            onChange={this.changed}
            onSubmit={this.authenticate}
            onError={this.errors}
          />

        <div className="errors">{message || <span>&nbsp;</span>}</div>

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
    }
  }

  authenticate = (username, password) => {
    const { WooAdmin } = this.props;
    // console.log('Authentication.authenticate:', { username, password });
    WooAdmin.authenticate(username, password)
      .then(result => {
        // console.log('WooAdmin.authenticate:', result);
        this.setState({ isAuthenticated: true });
      })
      .catch(err => {
        // console.log('WooAdmin.authenticate: error:', err);
        this.setState({ isAuthenticated: false, message: 'Your email or password is incorrect. Please try again.'})
      })
  }

  render() {
    const { isAuthenticated, message } = this.state;
    if (!isAuthenticated) {
      return <Authenticate authenticate={this.authenticate} message={message} />
    }

    return this.props.children;
  }
}

export default Authentication;
