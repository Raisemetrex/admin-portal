
import React from 'react';

class Charts extends React.Component {
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
        <h3>Charts</h3>
        <p>
          Please open the Charts menu in the sidebar and select a chart you would like to run.
        </p>
        <p>
          In some cases there will be a form to filter your request.
        </p>
        <p>Enter the details as requested and then you can run the chart.</p>
      </div>
    )
  }
}

export default Charts;
