
import React from 'react';
import sqlFormatter from 'sql-formatter';

import ReactJsonEditor from './reactJsonEditor';

class JSONEditor extends React.Component {
  constructor(props) {
    super(props);
    const { values } = props;
    // values.properties.sql = sqlFormatter.format(values.properties.sql);
    this.state = {
      values
    }
  }
  onChange = (values) => {
    // console.log('JSONEditor.onChange: values:', values);
    // const sql = values.properties.sql;
    // const formatted = sqlFormatter.format(sql);
    // console.log({ sql, formatted});
    // values.properties.sql = formatted.replace('\\n', '<br/>');
    // this.setState({ values });
  }
  render() {
    return (
      <ReactJsonEditor mode="text" values={this.state.values} onChange={this.onChange} />
    )
  }

}

export default JSONEditor;
