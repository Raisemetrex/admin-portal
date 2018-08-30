
import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import JSONData from '../lib/JSONData';

const dummyColumns = [
  {
    Header: 'Email',
    accessor: 'email',
  }
];

const dummyData = [
  {email: 'gary@gmail.com'}
]

class AccountResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { Header: 'Email', accessor: 'email' },
        { Header: 'Name', accessor: 'name' },
      ],
      data: []
    }
  }
  componentDidMount() {
    JSONData.read('users')
      .then(data => {
        // console.log('componentDidMount: users:', data);
        this.setState({ data });
      })
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

export default AccountResults;
