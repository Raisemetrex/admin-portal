
import React from 'react';

import ComponentFactory from './componentFactory';
import DataTable from './dataTable';

function AccountDomains(props) {
  // console.log('AccountUsers: props:', props);
  const query_key = 'hidden.account_domains';
  const query = props.menu.find(query_key);
  if (!query) return <div>Query for {query_key} is missing</div>;

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

ComponentFactory.add(AccountDomains, 'AccountDomains');

export default AccountDomains;
