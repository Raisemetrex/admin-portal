
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';

import 'rc-tree/assets/index.css';

const menu = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    'data-action': {
      id: 'DashboardTab'
    }
  },
  {
    key: 'reports',
    title: 'Reports',
    children: [
      {
        key: 'accounts',
        title: 'Accounts',
        'data-action': {
          enableRename: false,
          component: 'AccountSearch',
          id: 'account-search',
          name: 'Account Search',
        }
      },
      {
        key: 'quick-test',
        title: 'Quick Test',
        'data-action': {
          enableRename: false,
          component: 'QuickTest',
          id: 'quick-test',
          name: 'Quick Test',
        }
      },
    ],
    'data-action': {
      enableRename: false,
      id: 'reports',
      name: 'Reports',
      component: 'Reports',
    },
  },
];

const treeData = [
  { key: '0-0', title: 'parent 1', children:
    [
      { key: '0-0-0', title: 'parent 1-1', children:
        [
          { key: '0-0-0-0', title: 'parent 1-1-0' },
        ],
      },
      { key: '0-0-1', title: 'parent 1-2', children:
          [
            { key: '0-0-1-0', title: 'parent 1-2-0', disableCheckbox: true },
            { key: '0-0-1-1', title: 'parent 1-2-1' },
          ],
      },
    ],
  },
];


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
    // const items = menu.map(item => {
    //   const props = {...item};
    //   return (
    //     <TreeNode {...props} />
    //   )
    // })

    const loop = data => {
      return data.map((item) => {
        const { children, ...rest} = item;
        if (children) {
          return (
            <TreeNode
              {...rest}
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...rest} />;
      });
    };

    return (
      <Tree
        onSelect={this.onSelect}
      >
        {loop(menu)}
      </Tree>
    )
  }
}

export default SideMenu;
