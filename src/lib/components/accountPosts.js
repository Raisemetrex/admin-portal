
import React from 'react';

import DataTable from './dataTable';
import AccountDetails from './accountDetails.js';

function AccountPosts(props) {
  // console.log('AccountPosts: props:', props);
  const accountPosts = props.menu.find('hidden.account_posts');
  const { data } = props;
  // console.log('accountPosts:', { accountPosts, data });
  accountPosts.params = [data.id];
  return (
    <div>
      {/*<AccountDetails data={data} />*/}
      <DataTable
        {...props}
        pageSize={10}
        query={accountPosts}
      />
    </div>
  )
}

export default AccountPosts;
