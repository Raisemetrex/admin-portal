
import React from 'react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

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
  
  render() {
    
    return (
      <div style={{padding: '10px'}}>
        <h3>Account Results</h3>
        <ReactTable 
            columns={dummyColumns}
            data={dummyData}
            pageSize={5}
          />
      </div>
    )
  }
}

export default AccountResults;
