

import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import WooAdmin from '../data/wooAdmin';

import { filterContainsNoCase } from '../utils/reactTableFilters';

class RestTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    }
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    // const requestFiltered = {
    //   params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
    //   sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
    // };
    const { componentOptions } = this.props;
    // console.log('componentDidMount: props:', this.props);
    WooAdmin.rest(componentOptions.url)
      .then(data => {
        // console.log('didMount: result:', data);
        if (data.hasOwnProperty('error')) {
          const { text: error } = data;
          this.setState({ error });
        } else {
          const columns = WooAdmin.getReactTableColumns(data, {componentOptions});
          this.setState({ data, columns });
        }
      })
      .catch(err => {
        console.log('RestTable: didMount: error:', err)
      });
  }
  render() {
    // console.log('RestTable.props:', this.props);
    const { columns, data, error } = this.state;
    if (error) {
      return (
        <div dangerouslySetInnerHTML={{__html: error}} />
      )
    }
    return (
      <ReactTable
          className={this.props.className}
          columns={columns}
          data={data}
          defaultPageSize={this.props.pageSize}
          filterable
          defaultFilterMethod={this.props.defaultFilterMethod}
        />
    )
  }
}

RestTable.defaultProps = {
  defaultFilterMethod: filterContainsNoCase,
  pageSize: 20,
  className: '-striped -highlight',
};

export default RestTable;
