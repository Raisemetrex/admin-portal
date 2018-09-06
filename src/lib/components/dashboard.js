
import React from 'react';

import Dazzle from 'react-dazzle';
import { DashboardWithoutDndContext } from 'react-dazzle';
import 'react-dazzle/lib/style/style.css';

import PostsByMonth from './widgets/PostsByMonth';
import PostsByCategory from './widgets/PostsByCategory';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: linedata,
      widgets: {
        PieChart: {
          type: PostsByCategory,
          title: 'Posts By Category - All Time',
          props,
        },
        BarChart: {
          type: PostsByMonth,
          title: 'Posts By Month - Last 6 Months',
          props
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
      <Dazzle widgets={this.state.widgets} layout={this.state.layout} editable={false} />
    )
  }
}

export default Dashboard;
