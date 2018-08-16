
import React from 'react';
import ReactDOM from 'react-dom';
import FlexLayout from 'flexlayout-react';

import Dashboard from './dashboard';
import SideMenu from './sidemenu';
import AccountSearch from './accountSearch';
import AccountResults from './accountResults';
import QuickTest from './quickTest';
import Reports from './reports';
import Tools from './tools';
import Settings from './settings';
import JsonProps from './jsonProps';

import ReactTable from 'react-table';

const another = {
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
			enableDrop: false,
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
				// {
				// 	type: 'tab',
				// 	name: 'Tools',
				// 	component: 'tools',
				// 	id: '#tools',
				// 	enableClose: false,
				// 	enableDrag: false,
				// 	enableRename: false,
				// },
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
	 // {
		//  type: 'border',
		//  location: 'right',
		//  children: [
	 //
		//  ],
	 // },
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
				this.state = {model: FlexLayout.Model.fromJson(another)};
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
					case 'button':
						result = <button>{node.getName()}</button>;
						break;
					case 'grid':
						const fields = ['Name', 'ISIN', 'Bid', 'Ask', 'Last', 'Yield'];
						if (node.getExtraData().data == null) {
								// create data in node extra data first time accessed
								node.getExtraData().data = this.makeFakeData(fields);
						}
						result = <SimpleTable fields={fields} onClick={this.onTableClick.bind(this, node)} data={node.getExtraData().data}/>;
						break;
					case 'ReactTable':
						const config = node.getConfig();
						const rtProps = {
							...config,
							...props,
							defaultFilterMethod: (filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())
						}
						result = <div style={{padding: '10px'}}><ReactTable { ...rtProps } /></div>;
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
						result = <SideMenu  {...props} />;
						break;
					case 'Reports':
						result = <Reports {...props} />;
						break;
					case 'QuickTest':
						result = <QuickTest {...props} />;
						break;
					case 'AccountSearch':
						result = <AccountSearch  {...props}  />
						break;
					case 'AccountResults':
						result = <AccountResults  {...props}  />
						break;
				}

				return result;
    }

    onTableClick(node, event) {
        console.log('tab: \n' + node._toAttributeString());
        console.log('tabset: \n' + node.getParent()._toAttributeString());
    }

    makeFakeData(fields) {
        var data = [];
        var r = Math.random() * 50;
        for (var i = 0; i < r; i++) {
            var rec = {};
            rec.Name = this.randomString(5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
            rec.ISIN = rec.Name + this.randomString(7, '1234567890');
            for (var j = 2; j < fields.length; j++) {
                rec[fields[j]] = (1.5 + Math.random() * 2).toFixed(2);
            }
            data.push(rec);
        }
        return data;
    }

    randomString(len, chars) {
        var a = [];
        for (var i = 0; i < len; i++) {
            a.push(chars[Math.floor(Math.random() * chars.length)]);
        }

        return a.join('');
    }

    render() {
        return (
            <FlexLayout.Layout
							ref={(r) => this.layout = r}
							model={this.state.model}
							factory={this.factory.bind(this)}
						/>
        )
    }
}

class SimpleTable extends React.Component {
    shouldComponentUpdate() {
        return true;
    }

    render() {
        var headercells = this.props.fields.map(function (field) {
            return <th key={field}>{field}</th>;
        });

        var rows = [];
        for (var i = 0; i < this.props.data.length; i++) {
            var row = this.props.fields.map(field => <td key={field}>{this.props.data[i][field]}</td>);
            rows.push(<tr key={i}>{row}</tr>);
        }

        return (
          <table className='simple_table' onClick={this.props.onClick}>
            <tbody>
            <tr>{headercells}</tr>
            {rows}
            </tbody>
          </table>
        );
    }
}


export default Main;
