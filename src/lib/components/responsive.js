
import React from 'react';

import FlexLayout from 'flexlayout-react';
import { getMasterDetailLayout } from '../../flexlayout/utils';

const responsiveLayout = {
	global: {},
	layout: {
		type: 'row',
		id: 'SubContainer',
		children: [
      {
        type: 'row',
        weight: 150,
        children: [
          {
    				type: 'tabset',
            name: 'Master',
    				weight: 50,
    				enableClose: false,
    				active: true,
            enableTabStrip: false,
            enableDrop: false,
            enableDivide: false,
    				// id: 'MAIN1',
    				children: [
              {
                type: 'tab',
                name: 'Master and Details - Example',
                enableClose: false,
                enableDrag: false,
                emableRename: false,
                component: 'AccountDetails',
                config: {
                  title: 'Master Detail'
                }
              },
    				],
    			},
          {
    				type: 'tabset',
    				weight: 50,
    				enableClose: false,
            enableDivide: false,
    				active: true,
    				// id: 'MAIN2',
    				children: [
              {
                type: 'tab',
                name: 'Detail 1',
                enableClose: false,
                // enableDrag: false,
                emableRename: false,
                component: 'EmptyComponent',
                config: {
                  title: 'Detail One',
                },
              },
              {
                type: 'tab',
                name: 'Detail 2',
                enableClose: false,
                // enableDrag: false,
                emableRename: false,
                component: 'EmptyComponent',
                config: {
                  title: 'Detail Two',
                },
              },
    				]
    			},
        ],
      },
		],
	},
};

class Responsive extends React.Component {
  constructor(props) {
      super(props);
      // const layout = {
      //   ...responsiveLayout,
      // };
      // layout.layout.children[0].children[0].children.forEach(child => child.config.data = {...props.data});
      // layout.layout.children[0].children[1].children.forEach(child => child.config.data = {...props.data});

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
      // this.layout = {model: FlexLayout.Model.fromJson(monkey)};
  }

  render() {
    console.log('Responsive.props:', this.props);
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

export default Responsive;
