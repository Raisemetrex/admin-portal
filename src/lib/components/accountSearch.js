
import React from 'react';
import shortid from 'shortid';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

const schema = {
  title: "Account Search",
  type: "object",
  // required: ["name"],
  properties: {
    name: {type: "string", title: "Name", },
    email: {type: "string", title: "Email"},
  }
};

const uiSchema = {
  // 'ui:order': [ 'email', 'name' ],  
  email: { 'ui:placeholder': 'Full or Partial Email Address' }, 
  name: { 'ui:placeholder': 'First, Last or both - partial separate with a comma' },
}

const log = (type) => console.log.bind(console, type);

class AccountSearch extends React.Component {

  onSubmit = (form) => {
    // console.log('onSubmit:', form);
    // console.log('onSubmit: props:', this.props);
    // console.log('shortid:', shortid.generate());
    const newId = shortid.generate();
    const newTab = {
      component: 'AccountResults',
      name: `Account Results (${newId})`,
      id: `AccountResults-${shortid.generate()}`,
    }
    this.props.addNode(newTab);
  }

  render() {
    
    return (
      <div
        style={{padding: '10px'}}
        >
        <Form 
          schema={schema}
          uiSchema={uiSchema}
          onChange={log("changed")}
          onSubmit={this.onSubmit}
          onError={log("errors")} 
        />
      </div>
    )
  }
}

export default AccountSearch;
