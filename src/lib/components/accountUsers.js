
import React from 'react';

import DataTable from './dataTable';

function AccountUsers(props) {
  // console.log('AccountUsers: props:', props);
  const query = props.menu.find('hidden.account_users');
  const { data } = props;
  query.params = [data.id];
  return (
    <div>
      <DataTable
        {...props}
        query={query}
      />
    </div>
  )
}

export default AccountUsers;
