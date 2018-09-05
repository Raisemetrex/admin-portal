
import React from 'react';
// import ReactDOM from 'react-dom';
import shortid from 'shortid';
import FlexLayout from 'flexlayout-react';

import MenuStore from '../mobx/menuStore';

import ComponentFactory from '../lib/components/componentFactory';

const DashboardPanel = {
	type: 'tab',
	name: 'Dashboard',
	enableClose: false,
	enableDrag: false,
	enableRename: false,
	component: 'Dashboard',
	id: 'DashboardTab',
};

const SideMenuPanel = {
	type: 'tab',
	enableClose: false,
	enableDrag: false,
	enableRename: false,
	name: 'Menu',
	component: 'SideMenu',
	id: '#menu',
};

const SettingsPanel = {
	type: 'tab',
	enableClose: false,
	enableDrag: false,
	enableRename: false,
	name: '\u2699',
	component: 'Settings',
	id: '#settings',
};

const toolsPanel = {
	type: 'tab',
	name: 'Tools',
	component: 'Tools',
	id: '#tools',
	enableClose: false,
	enableDrag: true,
	enableRename: false,
};

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
					DashboardPanel
				]
			},
		]
	},
	borders: [
		{
			type: 'border',
			location: 'left',
			selected: 0,
			children: [
				SideMenuPanel,
				SettingsPanel,
			]
	 },
	 {
		 type: 'border',
		 location: 'right',
		 // children: [],
	 },
	 {
		 type: 'border',
		 location: 'bottom',
		 // children: [],
	 },
	]
};

class Main extends React.Component {

    constructor(props) {
        super(props);
				this.state = {model: FlexLayout.Model.fromJson(mainLayout)};
    }

		componentDidMount() {
			const { WooAdmin } = this.props;
			if (['local'].includes(WooAdmin.getEnvironment())) {
				this.layout.addTabToTabSet('border_right',toolsPanel);
				// this.layout.doAction(FlexLayout.Actions.selectTab(toolsPanel.id));
			}
		}

		addNode = (node) => {
			// console.log('Layout.addNode node:', node);
			const existing = this.layout.model.getNodeById(node.id);
			if (!existing) {
				this.layout.addTabToTabSet('MAIN', node);
				// this.layout.addTabToActiveTabSet(node);
				const newNode = this.layout.model.getNodeById(node.id);
				newNode.getExtraData().data = node;
			} else {
				this.layout.doAction(FlexLayout.Actions.selectTab(node.id));
			}
		}

    factory(node) {
        const component = node.getComponent();
				const extraData = node.getExtraData().data || {};
				const config = node.getConfig() || {};

				var result = <div style={{padding: '10px'}}><h4>Unknown Component</h4></div>;
				const { WooAdmin, setEnvironment } = this.props;
				const { addNode } = this;
				const props = {
					addNode,
					setEnvironment,
					WooAdmin,
					setEnvironment,
					...config,
					...extraData,
					logout: WooAdmin.logout,
					menu: MenuStore,
				};

				// console.log('factory:', { component, extraData, config, props });

				result = ComponentFactory.create(component, props);
				console.assert(result,`Layout: ComponentFactory could not locate component: ${component}`);

				return result;
    }

		settingsClick = (x) => {
			const { target } = x;
			console.log('settingsClick:', { target, x });
		}

		onRenderTab = (node, renderValues) => {
			console.log('onRenderTab:', { node, renderValues });
			renderValues.leading = 'Bingo:';
		}

		onRenderTabSet = (node, renderValues) => {
			if (node._attributes.id === 'MAIN') {
				console.log('onRenderTabSet:', { node, renderValues });
				renderValues.headerContent = "-- " + renderValues.headerContent + " --";
				renderValues.buttons.push(<i className="fa fa-fw fa-cog" key={shortid.generate()} onClick={this.settingsClick} />);
			}
		};

    render() {
			// console.log('layout: props:', this.props);
			const { onRenderTabSet, onRenderTab } = this;
			const extra = {
				// onRenderTab,
				// onRenderTabSet
			}
      return (
          <FlexLayout.Layout
						ref={(r) => this.layout = r}
						model={this.state.model}
						factory={this.factory.bind(this)}
						{...extra}
					/>
      )
    }
}

export default Main;
