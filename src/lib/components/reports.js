
import React from 'react';

// import ReactJsonEditor from './reactJsonEditor';
// import ReactTable from 'react-table';
//
// function propertiesEditor(row) {
//   const { properties } = row;
//   return (
//     <ReactJsonEditor
//       values={properties}
//     />
//   )
//   // onChange={editorChangeHandler}
//
// }

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [{Header: 'Empty', accessor: 'id'}],
    };
  }

  componentDidMount() {
    // console.log('Reports: cdm: props:', this.props);
  }

  render() {
    const { data, columns } = this.state;
    const tableProps = {
      data,
      columns,
      className: '-striped -highlight',
    };
    return (
      <div
        style={{padding: '10px'}}
        >
        <h3>Reports</h3>
        <p>
          Please open the Reports menu in the sidebar and select a report you would like to run.
        </p>
        <p>
          In most cases there will be a form to filter your request.
        </p>
        <p>Enter the details as requested and then you can run the report.</p>
      </div>
    )
  }
}

export default Reports;
