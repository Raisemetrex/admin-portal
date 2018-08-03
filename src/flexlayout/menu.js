
import React from 'react';
import InfinityMenu from 'react-infinity-menu';
import 'react-infinity-menu/src/infinity-menu.css';

const tree = [
  {
      name: "menu1", /*require*/
      id: 1, /*require*/
      isOpen: false, /*require*/
      // customComponent: YOUR_OWN_COMPONENT_FOR_MENU,
      children: [
          {
              name: "submenu1",
              id: 1,
              isOpen: false,
              // customComponent: YOUR_OWN_COMPONENT_FOR_SUB_MENU,
              children: [
                  {
                      name: "item1-1",
                      id: 1
                  },
                  {
                      name: "item1-2",
                      id: 2
                  }
              ]
          },
          {
              name: "submenu2",
              id: 2,
              isOpen: false,
              // customComponent: YOUR_OWN_COMPONENT_FOR_SUB_MENU,
              children: [
                  {
                      name: "item2-1",
                      id: 1
                  }
              ]
          }
      ]
  },
  {
      name: "menu2", /*require*/
      id: 2, /*require*/
      isOpen: false, /*require*/
      // customComponent: YOUR_OWN_COMPONENT_FOR_MENU,
      children: [
          {
              name: "item3-1",
              id: 1
          }
      ]
  }
  
];

class Menu extends React.Component {
  
  onNodeMouseClick = (event, tree, node, level, keyPath) => {
      this.setState({
          tree: tree
      });
  }
    
  render() {
    return (
      <InfinityMenu tree={tree} onNodeMouseClick={this.onNodeMouseClick} />
    )
  }
}

// class Menu extends React.Component {
// 
//   render() {
//     return (
//       <ul>
//         <li>Accounts</li>
//       </ul>
//     )
//   }
// }

export default Menu;
