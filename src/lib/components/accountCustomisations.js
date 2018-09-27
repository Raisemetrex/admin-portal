
import React from 'react';

import ComponentFactory from './componentFactory';
import DataTable from './dataTable';

function AccountCustomisations(props) {
  // console.log('AccountUsers: props:', props);
  const query_key = 'hidden.account_customisations';
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

ComponentFactory.add(AccountCustomisations, 'AccountCustomisations');

export default AccountCustomisations;
