
import React from 'react';
import { Bar } from 'react-chartjs-2';

import WooAdmin from '../data/wooAdmin';

import humanReadable from '../utils/humanReadable';
import colors from '../utils/randomColors';

class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      options: {
        title: {
					display: true,
					text: 'Posts by Month',
				},
			},
      data: {
        labels: [
          // 'January', 'February', 'March', 'April', 'May', 'June', 'July'
        ],
        datasets: [
          {
            label: 'Posts',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [
              // 65, 59, 80, 81, 56, 55, 40
            ]
          }
        ]
      },
    };
  }

  componentDidMount() {
    const { properties } = this.props.query;
    const { sql, params } = properties;
    WooAdmin.query({sql, params})
      .then(result => {
        // console.log('BarChart: result:', result);
        const columns = WooAdmin.getReactTableColumns(result);
        const { data } = this.state;
        data.labels = result.map(row => row.mon.split('T')[0]);
        data.datasets[0].data = result.map(row => row.count);
        // console.log('BarChart: data:', data);
        this.setState({ data });
      })
      .catch(err => console.log('PieChart: didMount: error:', err));
  }

  onElementsClick = (elems) => {
    console.log('onElementsClick:', elems);
  }

  render() {
    let options = {...this.state.options};
    if (this.props.showTitle === 'no') {
      options.title.display = false;
    }
    return (
      <div style={{width: '800px', height: '450px', padding: '10px'}}>
      <h6>Bar Chart</h6>
        <Bar
          data={this.state.data}
          options={options}
          onElementsClick={this.onElementsClick}
        />
      </div>
    );
  }
}

export default BarChart;