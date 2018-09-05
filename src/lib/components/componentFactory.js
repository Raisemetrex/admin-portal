
import React from 'react';

import Dashboard from './dashboard';
import DataTable from './dataTable';
import RestTable from './restTable';
import PieChart from './pieChart';
import BarChart from './barChart';
import NewQuery from './newQuery';

import SideMenu from './sidemenu';
import AccountSearch from './accountSearch';
import AccountResults from './accountResults';
// import QuickTest from './quickTest';
import Reports from './reports';
import Charts from './charts';
import Tools from './tools';
import Settings from './settings';
import JsonProps from './jsonProps';


class ComponentFactory {
  constructor() {
    this.registry = new Map();
  }

  add(key, item) {
    this.registry.set(key, item);
    return this;
  }

  remove(key) {
    this.registry.delete(key);
    return this;
  }

  clear() {
    this.registry.clear();
    return this;
  }

  find(key) {
    return this.registry.get(key)
  }

  create(key, props) {
    const component = this.find(key);
    if (component) {
      return React.createElement(component, props);
    }
    return null;
  }
}

const factory = new ComponentFactory();

factory
  .add('Dashboard', Dashboard)
  .add('DataTable', DataTable)
  .add('RestTable', RestTable)
  .add('PieChart', PieChart)
  .add('BarChart', BarChart)
  .add('NewQuery', NewQuery)

  .add('SideMenu', SideMenu)
  .add('AccountSearch', AccountSearch)
  .add('AccountResults', AccountResults)
  .add('Reports', Reports)
  .add('Charts', Charts)
  .add('Tools', Tools)
  .add('Settings', Settings)
  .add('JsonProps', JsonProps)
  ;

window.factory = factory;

// console.log('ComponentFactory:', factory);

export default factory;
