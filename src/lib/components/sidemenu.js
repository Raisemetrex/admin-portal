
import React from 'react';
import * as mobxReact from 'mobx-react';
import shortid from 'shortid';
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

// import MenuStore from '../mobx/menuStore';

// console.log({ mobxReact });

class SideMenu extends React.Component {

  onSelect = (item, info) => {
    const action = info.node.props['data-action'];
    // console.log('selected:', { item, info, action });

    let node = { name: 'Empty Component', component: 'EmptyComponent', id: `empty-component` };
    if (action) {
      node = {...action};
    }

    this.props.addNode(node);

  }

  loop = data => {
    return data.map(item => {

      if (item.hide) return undefined;

      const { key } = item;

      if (!key) console.log('no key:', { item });

      const { children, ...rest} = item;
      if (children) {
        return (
          <TreeNode
            {...rest}
          >
            {this.loop(item.children)}
          </TreeNode>
        );
      }

      return <TreeNode {...rest} />;
    }).filter(item => item);
  };

  render() {
    const { data } = this.props.menu;
    // console.log('SideMenu: data:', data);
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
