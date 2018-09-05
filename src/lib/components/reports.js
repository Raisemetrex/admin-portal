
import React from 'react';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
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
