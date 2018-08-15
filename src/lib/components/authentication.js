
import React from 'react';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

import WooAdmin from '../data/wooAdmin';

const schema = {
  title: 'Admin Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {type: "string", title: "Email", default: 'gary@reffind.com' },
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

        </div>
      </div>
    )
  }
}

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: WooAdmin.isAuthenticated(),
    }
  }

  authenticate = (username, password) => {
    // console.log('Authentication.authenticate:', { username, password });
    WooAdmin.authenticate(username, password)
      .then(result => {
        // console.log('WooAdmin.authenticate:', result);
        this.setState({ isAuthenticated: true });
      })
      .catch(err => {
        console.log('WooAdmin.authenticate: error:', err);
      })
  }

  render() {
    const { isAuthenticated } = this.state;
    if (!isAuthenticated) {
      return <Authenticate authenticate={this.authenticate} />
    }

    return this.props.children;
  }
}

export default Authentication;
