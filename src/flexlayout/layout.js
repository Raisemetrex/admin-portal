
import React from 'react';
// import ReactDOM from 'react-dom';
import shortid from 'shortid';
import FlexLayout from 'flexlayout-react';

import Panels from './panels/index';
import ComponentFactory from '../lib/components/componentFactory';

import { trimAccountId } from '../lib/utils/transformations';

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
					Panels.DashboardPanel
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
				Panels.SideMenuPanel,
				Panels.SettingsPanel,
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
				this.layout.addTabToTabSet('border_right', Panels.ToolsPanel);
				// this.layout.doAction(FlexLayout.Actions.selectTab(toolsPanel.id));
			}
		}

		showPosts = (data, props, actionProps) => {
			console.log('showPosts:', { data, props, actionProps });

	    const newTab = {
	      component: 'AccountPosts',
				componentOptions: {
					data,
					...actionProps,
				},
	      name: `Account Posts (${trimAccountId(data.id)})`,
	      id: `AccountPosts-${data.id}`,
	    }
	    this.addNode(newTab);

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
				const { componentOptions, ...restExtra} = extraData;
				const config = node.getConfig() || {};

				// console.log('factory:', { component, extraData, config });

				const { addNode, showPosts } = this;
				const props = {
					...this.props,
					addNode,
					showPosts,
					...config,
					...restExtra,
					...componentOptions,
				};

				// console.log('factory:', { component, extraData, config, props });

				const result = ComponentFactory.create(component, props);
				console.assert(result,`Layout: ComponentFactory could not locate component: ${component}`);

				return result;
    }

		// settingsClick = (x) => {
		// 	const { target } = x;
		// 	console.log('settingsClick:', { target, x });
		// }
		//
		// onRenderTab = (node, renderValues) => {
		// 	console.log('onRenderTab:', { node, renderValues });
		// 	renderValues.leading = 'Bingo:';
		// }
		//
		// onRenderTabSet = (node, renderValues) => {
		// 	if (node._attributes.id === 'MAIN') {
		// 		console.log('onRenderTabSet:', { node, renderValues });
		// 		renderValues.headerContent = "-- " + renderValues.headerContent + " --";
		// 		renderValues.buttons.push(<i className="fa fa-fw fa-cog" key={shortid.generate()} onClick={this.settingsClick} />);
		// 	}
		// };

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
