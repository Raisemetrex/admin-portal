import React from 'react';
import { Pie, Polar } from 'react-chartjs-2';

import Loading from './loading';

// import WooAdmin from '../data/wooAdmin';

import humanReadable from '../utils/humanReadable';
import colors from '../utils/randomColors';
import { getReactTableColumns } from '../utils/reactTableColumns';

class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      options: {
        startAngle: -45 * Math.PI / 180,
        // startAngle: -0.8 * Math.PI,
				responsive: true,
				legend: {
					position: 'bottom',
				},
				title: {
					display: false,
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

    // console.log('cdm: props:', this.props);
    this.load();
  }

  load = () => {
    this.setState({ loading: true }, () => {
      const { properties, id } = this.props.query;
      const { params } = properties;
      const state = { loading: false};
      const { WooAdmin } = this.props;
      WooAdmin.queryById({id, params})
        .then(result => {
          const columns = getReactTableColumns(result);
          const { data } = this.state;
          data.labels = result.map(row => humanReadable(row.category));
          data.datasets[0].data = result.map(row => row.count);
          // console.log('PieChart: data:', data);
          state.result = result;
          state.data = data;
          // this.setState({ data });
        })
        .catch(err => console.log('PieChart: didMount: error:', err))
        .finally(() => {
          this.setState(state);
        })
    });
  }

  onElementsClick = (elems) => {
    // const { data, result } = this.state;
    // // const { datasets } = data;
    // console.log('PieChart.onElementsClick:', { elems, data, result });
    // elems.map(e => {
    //   // const dataset = datasets[e._datasetIndex];
    //   // const { data } = dataset;
    //   const item = result[e._index];
    //   console.log('item:', item);
    // })
  }

  render() {
    const { options, loading } = this.state;
    if (loading) return <Loading />;
    if (this.props.showTitle === 'no') {
      options.title.display = false;
    }
    return (
      <Polar
        data={this.state.data}
        options={options}
        onElementsClick={this.onElementsClick}
      />
    );
  }
}

export default PieChart;
