
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';

import 'rc-tree/assets/index.css';

const menu = [
  {
    title: 'Dashboard',
    key: 'dashboard',
    'data-action': {
      id: 'DashboardTab'
    }
  },
  {
    title: 'Accounts',
    key: 'accounts',
    'data-action': {
      enableRename: false,
      component: 'AccountSearch',
      id: 'account-search',
      name: 'Account Search',
    }
  },
  {
    title: 'Reports',
    key: 'reports',
    'data-action': {
      enableRename: false,
      id: 'reports',
      name: 'Reports',
    }
  },
  {
    title: 'Quick Test',
    key: 'quick-test',
    'data-action': {
      enableRename: false,
      component: 'QuickTest',
      id: 'quick-test',
      name: 'Quick Test',
    }
  },
]

class SideMenu extends React.Component {

  onSelect = (item, info) => {
    const action = info.node.props['data-action'];
    console.log('selected:', { item, info, action });

    let node = { component: 'dummy', id: 'dummy-component' };
    if (action) {
      node = {...action};
    }

    this.props.addNode(node);

  }


  render() {
    const items = menu.map(item => {
      const props = {...item};
      return (
        <TreeNode {...props} />
      )
    })
    return (
      <Tree onSelect={this.onSelect}>
        {items}
      </Tree>
    )
  }
}

export default SideMenu;
