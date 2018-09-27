
import React from 'react';

import ComponentFactory from './componentFactory';
import DataTable from './dataTable';

function AccountCompanyValues(props) {
  // console.log('AccountUsers: props:', props);
  const query = props.menu.find('hidden.account_values');
  if (!query) return <div>Query for hidden.account_values is missing</div>;

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

ComponentFactory.add(AccountCompanyValues, 'AccountCompanyValues');

export default AccountCompanyValues;
