
import React from 'react';

import ComponentFactory from './componentFactory';
import DataTable from './dataTable';

function AccountAnnouncements(props) {
  // console.log('AccountUsers: props:', props);
  const query = props.menu.find('hidden.account_announcements');
  if (!query) return <div>Query for hidden.account_announcements is missing</div>;

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

ComponentFactory.add(AccountAnnouncements, 'AccountAnnouncements');

export default AccountAnnouncements;
