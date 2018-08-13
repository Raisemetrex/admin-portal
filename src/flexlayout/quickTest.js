

import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import PhoenixAuth from '../lib/PhoenixAuth';

class QuickTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { Header: 'Email', accessor: 'email_address' },
        { Header: 'First Name', accessor: 'first_name' },
        { Header: 'Last Name', accessor: 'last_name' },
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
    const requestFiltered = {
      params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
      sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
    };
    const requestAll = {
      params: [],
      sql: 'SELECT * FROM users',
    };
    PhoenixAuth.query(requestFiltered)
      .then(data => {
        console.log('didMount: result:', data);
        this.setState({ data });
      })
      .catch(err => console.log('QuickTest: didMount: error:', err));
  }
  render() {
    const { columns, data } = this.state;
    return (
      <div style={{padding: '10px'}}>
        <h3>Account Results</h3>
        <ReactTable
            columns={columns}
            data={data}
            pageSize={15}
            filterable
            defaultFilterMethod={(filter,row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
          />
      </div>
    )
  }
}

export default QuickTest;
