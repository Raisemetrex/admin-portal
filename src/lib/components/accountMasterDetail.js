
import React from 'react';

import FlexLayout from 'flexlayout-react';
import { getMasterDetailLayout } from '../../flexlayout/utils';

class AccountMasterDetail extends React.Component {
  constructor(props) {
      super(props);

      const config = {
        ...props,
        data: {...props.data},
      }
      const masterDetailLayout = getMasterDetailLayout(
        {
          name: 'Account Details',
          component: 'AccountDetails',
          config,
        },
        [
          {
            name: 'Posts',
            component: 'AccountPosts',
            config,
          },
          {
            name: 'Users',
            component: 'AccountUsers',
            config,
          },
        ]
      )

      this.layout = {model: FlexLayout.Model.fromJson(masterDetailLayout)};
  }

  render() {
    // console.log('AccountMasterDetail.props:', this.props);
    return (
      <div>
        {/*<h4>Some Nested Stuff</h4>*/}
        <FlexLayout.Layout
          model={this.layout.model}
          factory={this.props.factory}
        />
      </div>
    )
  }
}

export default AccountMasterDetail;
