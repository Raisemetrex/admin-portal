
import React from 'react';

import DataTable from './dataTable';

function AccountPosts(props) {
  console.log('AccountPosts: props:', props);
  const accountPosts = props.menu.find('hidden.account_posts');
  const { data } = props;
  console.log('accountPosts:', { accountPosts, data });
  accountPosts.params = [data.id];
  return (
    <div>
      <div className="account-details">
        <dl>
          <dt>Account Name:</dt><dd>{data.name}</dd>
          <dt>Email Address:</dt><dd>{data.email_address}</dd>
        </dl>
      </div>
      <DataTable
        {...props}
        pageSize={10}
        query={accountPosts}
      />
    </div>
  )
}

export default AccountPosts;
