
import React from 'react';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

const schema = {
  title: 'Admin Login',
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {type: "string", title: "Email", default: 'test@reffind.com' },
    password: {type: "string", title: "Password", default: 'testingpassword' },
  }
};

const uiSchema = {
  // 'ui:order': [ 'email', 'name' ],
  email: { 'ui:placeholder': 'Enter your email address' },
  password: { 'ui:widget': 'password', 'ui:placeholder': 'Enter your password' },
}

function log(message) {
  console.log(message);
}

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  errors = (errors) => {
    console.log({ errors });
  }

  changed = (changes) => {
    console.log({ changes });
  }

  render() {
    let { authenticate } = this.props;
    authenticate = (data) => {
      console.log('submit: data:', data);
      this.props.authenticate(data.formData);
    }
    return (
      <div className="aligner" style={{height: '400px'}}>
        <div className="aligner-item round-border">

          <Form
            className="form form-wide"
            schema={schema}
            uiSchema={uiSchema}
            onChange={this.changes}
            onSubmit={authenticate}
            onError={this.errors}
          />

          {/*<h5>Login</h5>
          <button onClick={this.props.authenticate}>Login</button>*/}
        </div>
      </div>
    )
  }
}

export default Authentication;
