
import React from 'react';
import sqlFormatter from 'sql-formatter';
import Codemirror from 'react-codemirror';

require('codemirror/mode/sql/sql');


class SQLEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // sql: sqlFormatter.format(props.sql || props.data),
      sql: props.sql || props.data,
    }

  }

  updateCode = (sql) => {
    // console.log('newCode:', sql);
    this.setState({ sql });
  }

  format = () => {
    // let sql = sqlFormatter.format(this.state.sql);
    // const { cm } = this;
    const { doc } = this.cm.codeMirror;
    // console.log('SQLEditor: format:', { doc, cm });
    doc.setValue(sqlFormatter.format(doc.getValue()));
    // this.setState({ sql });
  }

  compress = () => {
    const { doc } = this.cm.codeMirror;
    // const sql = doc.getValue();
    doc.setValue(doc.getValue().replace(/\s+/g, ' '));
    // this.props.onSave && this.props.onSave(sql);
  }

  render() {
    const { props } = this;
    const { sql } = this.state;
    // console.log('SQLEditor: render:', {
    //   sql,
    //   props,
    // });
    const options = {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'text/x-pgsql',
    };
    return (
      <div style={{padding: '5px'}}>
        {/*<div _className="leaf-row" _style={{display: 'inline-flex'}}>*/}
          <h4>
            SQL Editor
            <small style={{marginLeft: '10px'}}>
              <button onClick={this.format}>Format</button>&nbsp;
              <button onClick={this.compress}>Compress</button>&nbsp;
            </small>
          </h4>
          <Codemirror ref={r => this.cm = r} style={{height: '600px'}} value={sql} onChange={this.updateCode} options={options} autoFocus={true} />
        {/*</div>*/}
      </div>
    )
  }

}

export default SQLEditor;
