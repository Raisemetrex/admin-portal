
import React from 'react';
import Tree, { TreeNode } from 'rc-tree';

import QueryStore from '../mobx/queryStore';

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

function firstCap(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function humanReadable(s) {
  const words = s.split('-');
  const readable = words.map(word => {
    return firstCap(word);
  })
  return readable.join(' ');
}

function extendReportsMenu() {
  const reportsMenu = menu.find(item => item.key === 'reports');
  if (reportsMenu) {
    // console.log('reportsMenu:', reportsMenu);
    const queries = QueryStore.report();
    // console.log('queries:', queries);
    queries.forEach(query => {
      const { menuPath, component } = query;
      // console.log({ menuPath, component});
      const path = menuPath.split('.');
      const key = path[1];
      const title = humanReadable(key);
      const menuItem = {
        key,
        title,
        'data-action': {
          name: title,
          id: key,
          component,
          query,
        }
      };
      reportsMenu.children.push(menuItem);
    })
  } else {
    console.log('reportsMenu not found');
  }
}

extendReportsMenu();

class SideMenu extends React.Component {

  onSelect = (item, info) => {
    const action = info.node.props['data-action'];
    // console.log('selected:', { item, info, action });

    let node = { component: 'dummy', id: 'dummy-component' };
    if (action) {
      node = {...action};
    }

    this.props.addNode(node);

  }


  render() {
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
