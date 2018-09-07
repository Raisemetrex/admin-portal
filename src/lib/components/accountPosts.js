
import React from 'react';

import DataTable from './dataTable';

function AccountPosts(props) {
  const accountPosts = props.menu.find('hidden.account_posts');
  const { componentOptions } = props;
  const { data } = componentOptions;
  console.log('AccountPosts: props:', props);
  console.log('accountPosts:', { accountPosts, data });
  accountPosts.params = [data.id];
  return (
    <div style={{padding: '10px'}}>
      <h4>Account Posts</h4>
      <DataTable
        {...props}
        query={accountPosts}
      />
    </div>
  )
}

export default AccountPosts;
