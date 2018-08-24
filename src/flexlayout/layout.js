
import React from 'react';
// import ReactDOM from 'react-dom';
import shortid from 'shortid';
import FlexLayout from 'flexlayout-react';

import Dashboard from './dashboard';
import SideMenu from './sidemenu';
import AccountSearch from './accountSearch';
import AccountResults from './accountResults';
import QuickTest from './quickTest';
import Reports from './reports';
import Charts from './charts';
import Tools from './tools';
import Settings from './settings';
import JsonProps from './jsonProps';
import DataTable from '../lib/components/dataTable';
import PieChart from '../lib/components/pieChart';
import BarChart from '../lib/components/barChart';
import NewQuery from '../lib/components/newQuery';

import MenuStore from '../mobx/menuStore';

const mainLayout = {
	global: {},
	layout: {
		type: 'row',
		id: 'Container',
		children: [
			{
				type: 'tabset',
				weight: 12.5,
				enableClose: false,
				active: true,
				id: 'MAIN',
				children: [
					{
						type: 'tab',
						name: 'Dashboard',
						enableClose: false,
						enableDrag: false,
						enableRename: false,
						component: 'dashboard',
						id: 'DashboardTab'
					}
				]
			},
		]
	},
	borders: [
		{
			type: 'border',
			location: 'left',
			selected: 0,
			// enableDrop: true,
			// children: [
			// 	{ type: 'row', id: 'LeftBorderTop', children: [
			// 		{ type: 'tabset', id: 'bts', children: [
			// 			{
			// 				type: 'tab',
			// 				enableClose: false,
			// 				enableDrag: false,
			// 				enableRename: false,
			// 				name: 'Menu',
			// 				component: 'sidemenu',
			// 				id: '#menu',
			// 			},
			// 			{
			// 				type: 'tab',
			// 				enableClose: false,
			// 				enableDrag: false,
			// 				enableRename: false,
			// 				name: '\u2699',
			// 				component: 'settings',
			// 				id: '#settings',
			// 			},
			// 		]},
			// 	]}
			// ],
			children: [
				{
					type: 'tab',
					enableClose: false,
					enableDrag: false,
					enableRename: false,
					name: 'Menu',
					component: 'sidemenu',
					id: '#menu',
				},
				{
					type: 'tab',
					enableClose: false,
					enableDrag: false,
					enableRename: false,
					name: '\u2699',
					component: 'settings',
					id: '#settings',
				},
			]
	 },
	 {
		 type: 'border',
		 location: 'right',
		 selected: 0,
		 children: [
			 {
				 type: 'tab',
				 name: 'Tools',
				 component: 'tools',
				 id: '#tools',
				 enableClose: false,
				 enableDrag: true,
				 enableRename: false,
			 },
		 ],
	 },
	 {
		 type: 'border',
		 location: 'bottom',
		 children: [
		 ],
	 },
	]
};

class Main extends React.Component {

    constructor(props) {
        super(props);
				this.state = {model: FlexLayout.Model.fromJson(mainLayout)};
    }

		addNode = (node) => {
			// console.log('Layout.addNode node:', node);
			const existing = this.layout.model.getNodeById(node.id);
			if (!existing) {
				// this.layout.addTabToTabSet('MAIN', node);
				this.layout.addTabToActiveTabSet(node);
				const newNode = this.layout.model.getNodeById(node.id);
				newNode.getExtraData().data = node;
			} else {
				this.layout.doAction(FlexLayout.Actions.selectTab(node.id));
			}
		}

    factory(node) {
			// console.log('node:', node);

        const component = node.getComponent();
				const extraData = node.getExtraData().data;
				const config = node.getConfig();

				var result = <div style={{padding: '10px'}}><h4>Unknown Component</h4></div>;
				const { WooAdmin } = this.props;
				const { addNode } = this;
				const props = {
					addNode,
				};

				switch(component) {
					case 'dashboard':
						result = <Dashboard {...props} />
						break;
					case 'DataTable':
						const rtProps = {
							...config,
							...props,
							defaultFilterMethod: (filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase()),
							...extraData,
						}
						result = <div style={{padding: '10px'}}><DataTable { ...rtProps } /></div>;
						break;
					case 'Charts':
						result = <Charts { ...props } />;
						break;
					case 'settings':
						const settingsProps = {
							...props,
							logout: WooAdmin.logout,
						}
						result = <Settings {...settingsProps} />;
						break;
					case 'JsonProps':
						const jsonProps = {
							...props,
							...extraData,
						}
						result = <JsonProps {...jsonProps} />;
						break;
					case 'tools':
						result = <Tools {...props} />;
						break;
					case 'sidemenu':
						const sidemenuProps = {
							...props,
							menu: MenuStore,
						}
						result = <SideMenu  {...sidemenuProps} />;
						break;
					case 'Reports':
						result = <Reports {...props} />;
						break;
					case 'NewQuery':
						result = <NewQuery {...props} />;
						break;
					case 'QuickTest':
						result = <QuickTest {...props} />;
						break;
					case 'AccountSearch':
						result = <AccountSearch  {...props}  />
						break;
					case 'PieChart':
						const pieProps = {
							...config,
							...props,
							...extraData,
						}
						result = <PieChart {...pieProps} />
						break;
					case 'BarChart':
						const barProps = {
							...config,
							...props,
							...extraData,
						}
						result = <BarChart {...barProps} />
						break;
					case 'AccountResults':
						result = <AccountResults  {...props}  />
						break;
				}

				return result;
    }

		onRenderTabSet = (node, renderValues) => {
			// console.log('onRenderTabSet:', { node, renderValues });
			// renderValues.headerContent = "-- " + renderValues.headerContent + " --";
			// renderValues.buttons.push(<img key={shortid.generate()} src="grey_ball.png" />);
			renderValues.buttons.push(<i className="fa fa-fw fa-cog" key={shortid.generate()} />);
		};

    render() {
        return (
            <FlexLayout.Layout
							ref={(r) => this.layout = r}
							model={this.state.model}
							factory={this.factory.bind(this)}
							onRenderTabSet={this.onRenderTabSet}
						/>
        )
    }
}

export default Main;
