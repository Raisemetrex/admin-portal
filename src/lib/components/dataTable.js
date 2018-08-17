

import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import WooAdmin from '../data/wooAdmin';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        // {
        //   Header: 'Account ID',
        //   accessor: 'current_account_id',
        //   Cell: d => d || 'null'
        // },
      ],
      data: []
    }
  }
  componentDidMount() {
    // const requestFiltered = {
    //   params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
    //   sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
    // };
    const { sql, params } = this.props.query;
    WooAdmin.query({sql, params})
      .then(data => {
        // console.log('didMount: result:', data);
        const columns = WooAdmin.getReactTableColumns(data, this.props.query);
        this.setState({ data, columns });
      })
      .catch(err => console.log('QuickTest: didMount: error:', err));
  }
  render() {
    const { columns, data } = this.state;
    return (
      <ReactTable
          className="-striped -highlight"
          columns={columns}
          data={data}
          defaultPageSize={20}
          filterable
          defaultFilterMethod={(filter,row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
        />
    )
  }
}

export default DataTable;
