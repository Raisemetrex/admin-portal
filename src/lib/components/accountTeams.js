
import React from 'react';

import ComponentFactory from './componentFactory';
import DataTable from './dataTable';

function AccountTeams(props) {
  // console.log('AccountUsers: props:', props);
  const query = props.menu.find('hidden.account_teams');
  if (!query) return <div>Query for hidden.account_teams is missing</div>;

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

ComponentFactory.add(AccountTeams, 'AccountTeams');

export default AccountTeams;
