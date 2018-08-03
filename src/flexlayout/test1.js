
import React from "react";
import ReactDOM from "react-dom";
import FlexLayout from "flexlayout-react";

import Menu from './menu';

const json = {
	global: {},
	borders: [],
	layout:{
		"type": "row",
		"weight": 100,
		"children": [
			{
				"type": "tabset",
				"weight": 50,
				"selected": 0,
				"children": [
					{
						"type": "tab",
						"name": "FX",
						"component":"grid",
					}
				]
			},
			{
				"type": "tabset",
				"weight": 50,
				"selected": 0,
				"children": [
					{
						"type": "tab",
						"name": "FI",
						"component":"grid",
					}
				]
			}
		]
	}
};

const other = {
	"global": {},
	"layout": {
		"type": "row",
		"id": "#4",
		"children": [
			{
				"type": "tabset",
				"weight": 12.5,
				"active": true,
				"id": "#5",
				"children": [
					{
						"type": "tab",
						"name": "FX",
						"component": "grid",
						"id": "#6"
					}
				]
			},
			{
				"type": "tabset",
				"weight": 25,
				"id": "#7",
				"children": [
					{
						"type": "tab",
						"name": "FI",
						"component": "grid",
						"id": "#8"
					}
				]
			}
		]
	},
	"borders": [
		 {
		    "type": "border",
		 	"location": "left",
			"children": [
				{
					"type": "tab",
					"enableClose":false,
					"name": "Navigation",
					"component": "grid",
					"id": "#24"
				},
        {
          "type": "tab",
          "enabledCLose": false,
          "name": "Menu",
          "component": "menu",
          "id": "#menu",
        }
			]
		},
		{
		    "type": "border",
		 	"location": "right",
			"children": [
				{
					"type": "tab",
					"enableClose":false,
					"name": "Options",
					"component": "grid",
					"id": "#3"
				}
			]
		},
		{
		    "type": "border",
			"location": "bottom",
			"children": [
				{
					"type": "tab",
					"enableClose":false,
					"name": "Activity Blotter",
					"component": "grid",
					"id": "#2"
				},
				{
					"type": "tab",
					"enableClose":false,
					"name": "Execution Blotter",
					"component": "grid",
					"id": "#1"
				}
			]
		}
	]
};

const fields = ["Name", "ISIN", "Bid", "Ask", "Last", "Yield"];

class Main extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {model: FlexLayout.Model.fromJson(json)};
        this.state = {model: FlexLayout.Model.fromJson(other)};
    }

    factory(node) {
        var component = node.getComponent();
        
        if (component === "button") {
            return <button>{node.getName()}</button>;
        }
        
        if (component === "grid") {
            if (node.getExtraData().data == null) {
                // create data in node extra data first time accessed
                node.getExtraData().data = this.makeFakeData();
            }

            return <SimpleTable fields={fields} onClick={this.onTableClick.bind(this, node)} data={node.getExtraData().data}/>;
        }
            
        if (component === "menu") {
          return <Menu />
        }    
    }

    onTableClick(node, event) {
        console.log("tab: \n" + node._toAttributeString());
        console.log("tabset: \n" + node.getParent()._toAttributeString());
    }
        
    makeFakeData() {
        var data = [];
        var r = Math.random() * 50;
        for (var i = 0; i < r; i++) {
            var rec = {};
            rec.Name = this.randomString(5, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
            rec.ISIN = rec.Name + this.randomString(7, "1234567890");
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

        return a.join("");
    }
    
    render() {
        return (
            <FlexLayout.Layout model={this.state.model} factory={this.factory.bind(this)}/>
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
          <table className="simple_table" onClick={this.props.onClick}>
            <tbody>
            <tr>{headercells}</tr>
            {rows}
            </tbody>
          </table>
        );
    }
}


export default Main;
