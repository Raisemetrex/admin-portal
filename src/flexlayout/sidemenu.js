
import React from 'react';
import * as mobxReact from 'mobx-react';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

// import MenuStore from '../mobx/menuStore';

// console.log({ mobxReact });

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

  loop = data => {
    return data.map(item => {
      const { key } = item;

      if (!key) console.log('no key:', { item });

      const { children, ...rest} = item;
      if (key !== 'charts') {
        if (children) {
          return (
            <TreeNode
              {...rest}
            >
              {this.loop(item.children)}
            </TreeNode>
          );
        }
      }

      return <TreeNode {...rest} />;
    });
  };

  render() {
    const { data } = this.props.menu;

    return (
      <Tree
        onSelect={this.onSelect}
        defaultExpandAll={true}
        showLine
      >
        {this.loop(data)}
      </Tree>
    )
  }
}

export default mobxReact.observer(SideMenu);
