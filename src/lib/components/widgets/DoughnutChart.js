import React from 'react';
import { Doughnut } from 'react-chartjs-2';
// import { getRandomInt } from './util';

class DoughnutChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: [
      		'Red',
      		'Green',
      		'Yellow'
      	],
      	datasets: [{
      		data: [300, 50, 100],
      		backgroundColor: [
      		'#FF6384',
      		'#36A2EB',
      		'#FFCE56'
      		],
      		hoverBackgroundColor: [
      		'#FF6384',
      		'#36A2EB',
      		'#FFCE56'
      		]
      	}]
      },
    };
  }

  // componentDidMount() {
  //   const refreshIntervalId  = setInterval(() => {
  //     this.state.data[0].value = getRandomInt(0, 40);
  //     this.setState({
  //       data: this.state.data,
  //       refreshIntervalId,
  //     });
  //   }, 2000);
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.state.refreshIntervalId);
  // }

  render() {
    return (
      <Doughnut data={this.state.data} options={{ responsive: false, animationEasing: 'easeInSine', showTooltips: true }} height={250} width={250} />
    );
  }
}

export default DoughnutChart;
