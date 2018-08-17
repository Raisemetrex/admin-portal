import React from 'react';
import { Pie } from 'react-chartjs-2';

import WooAdmin from '../data/wooAdmin';

import humanReadable from '../utils/humanReadable';
import colors from '../utils/randomColors';

class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      options: {
				responsive: true,
				legend: {
					position: 'bottom',
				},
				title: {
					display: true,
					text: 'Posts by Category - All Time',
				},
				animation: {
					animateScale: true,
					animateRotate: true,
				}
			},
      data: {
        labels: [
      		// 'Red',
      		// 'Green',
      		// 'Yellow'
      	],
      	datasets: [{
      		data: [
            // 300, 50, 100
          ],
      		backgroundColor: colors,
          // [
        	// 	'#FF6384',
        	// 	'#36A2EB',
        	// 	'#FFCE56',
          //  '#FF6384',
        	// 	'#36A2EB',
        	// 	'#FFCE56',
      		// ],
      		hoverBackgroundColor: colors,
          // [
        	// 	'#FF6384',
        	// 	'#36A2EB',
        	// 	'#FFCE56',
          //  '#FF6384',
        	// 	'#36A2EB',
        	// 	'#FFCE56',
      		// ],
      	}]
      },
    };
  }

  componentDidMount() {
    const { sql, params } = this.props.query;
    WooAdmin.query({sql, params})
      .then(result => {
        const columns = WooAdmin.getReactTableColumns(result);
        const { data } = this.state;
        data.labels = result.map(row => humanReadable(row.category));
        data.datasets[0].data = result.map(row => row.count);
        // console.log('PieChart: data:', data);
        this.setState({ data });
      })
      .catch(err => console.log('PieChart: didMount: error:', err));
  }

  render() {
    let options = {...this.state.options};
    if (this.props.showTitle === 'no') {
      options.title.display = false;
    }
    return (
      <div style={{width: '800px', height: '800px', padding: '10px'}}>
        <Pie data={this.state.data} options={options} />
      </div>
    );
  }
}

export default PieChart;
