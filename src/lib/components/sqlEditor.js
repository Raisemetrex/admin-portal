
import React from 'react';

import Codemirror from 'react-codemirror';
import CMSQL from 'codemirror/mode/sql/sql';


class SQLEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sql: props.sql,
    }
  }

  updateCode = (newCode) => {
    console.log('newCode:', newCode);
  }

  render() {
    const { sql } = this.state;
    const options = {
      lineNumbers: true,
      lineWrapping: true,
    };
    return (
      <div style={{width: '800px'}}>
        <h4>SQL Editor</h4>
        <Codemirror value={sql} onChange={this.updateCode} options={options} autoFocus={true} />
      </div>
    )
  }

}

export default SQLEditor;
