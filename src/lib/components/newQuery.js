
import React from 'react';

import Form from "react-jsonschema-form";
import 'bootstrap/dist/css/bootstrap.css';

const schema = {
  title: 'New Query',
  type: 'object',
  required: ['menuPath', 'component', 'sql'],
  properties: {
    menuPath: {type: 'string', title: 'Menu Path' },
    sql: { type: 'string', title: 'SQL', default: '' },
    params: {type: 'string', title: 'Params', default: '' },
    component: { type: 'string', enum: ['DataTable', 'PieChart', 'BarChart'], enumNames: ['Data Table', 'Pie Chart', 'Bar Chart'], default: 'DataTable' },
  }
};

const uiSchema = {
  'ui:order': [ 'menuPath', 'sql', 'params', 'component' ],
  menuPath: { 'ui:placeholder': 'dotted menu path - e.g. reports.my-new-report'},
  component: { },
  sql: {
    'ui:widget': 'textarea',
    'ui:placeholder': 'Multi-line SQL',
    'ui:options': {
      rows: 5,
    },
  },
  params: {
    'ui:widget': 'textarea',
    'ui:placeholder': 'params - one per line for each $* replaceable parameter',
    'ui:options': {
      rows: 5,
    },
  },
}


class NewQuery extends React.Component {
  constructor(props) {
    super(props);
  }

  update = (form) => {
    console.log('NewQuery: update:', form);
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
        <Form
          className="form form-wide"
          schema={schema}
          uiSchema={uiSchema}
          onSubmit={this.update}
        />
      </div>
    )
  }
}

export default NewQuery;
