
import React from 'react';
import Dazzle from 'react-dazzle';
// import LineChart from './widgets/LineChart';
// import DoughnutChart from './widgets/DoughnutChart';

import PostsByMonth from './widgets/PostsByMonth';
import PostsByCategory from './widgets/PostsByCategory';

import 'react-dazzle/lib/style/style.css';

// const piedata = [
// 	{
// 		value: 300,
// 		color:"#F7464A",
// 		highlight: "#FF5A5E",
// 		label: "Red"
// 	},
// 	{
// 		value: 50,
// 		color: "#46BFBD",
// 		highlight: "#5AD3D1",
// 		label: "Green"
// 	},
// 	{
// 		value: 100,
// 		color: "#FDB45C",
// 		highlight: "#FFC870",
// 		label: "Yellow"
// 	}
// ];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: linedata,
      widgets: {
        PieChart: {
          type: PostsByCategory,
          title: 'Posts By Category - All Time',
        },
        BarChart: {
          type: PostsByMonth,
          title: 'Posts By Month - All Time'
        }
      },
      layout: {
        rows: [{
          columns: [
            {
              className: 'col-md-6 col-sm-6 col-xs-12',
              widgets: [{key: 'PieChart'}],
            },
            {
              className: 'col-md-6 col-sm-6 col-xs-12',
              widgets: [{key: 'BarChart'}],
            },
          ],
        }],
      }
    }
  }
  render() {

    return (
      <Dazzle widgets={this.state.widgets} layout={this.state.layout} />
    )

    // return (
    //   <div style={{padding: '10px'}}>
    //     <h4>Dashboard</h4>
    //     <LineChart />
    //     <DoughnutChart />
    //   </div>
    // )
  }
}

export default Dashboard;
