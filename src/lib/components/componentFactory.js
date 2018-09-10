
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
import AccountPosts from './accountPosts';

import JSONEditor from './jsonEditor';

import EmptyComponent from './emptyComponent';

import Responsive from './responsive';


function getDisplayName(Component) {
  // console.log('getDisplayName: Component', Component);
  return (
    Component.displayName ||
    Component.name ||
    (typeof Component === 'string' && Component.length > 0
      ? Component
      : 'Unknown')
  );
}

class ComponentFactory {
  constructor() {
    this.registry = new Map();
  }

  add(item, key = null) {
    const displayName = getDisplayName(item);
    console.assert(displayName !== 'Unknown' || key !== null, `displayName for item could not be found: item:`, { item, key });
    this.registry.set(key ? key : displayName, item);
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
    // console.log('ComponentFactory.create:', {key,props});
    const component = this.find(key);
    if (component) {
      return React.createElement(component, props);
    }
    return null;
  }
}

const factory = new ComponentFactory();

factory
  .add(Dashboard)
  .add(DataTable)
  .add(RestTable)
  .add(PieChart)
  .add(BarChart)
  .add(NewQuery)

  .add(SideMenu)
  .add(AccountSearch)
  .add(AccountResults)
  .add(Reports)
  .add(Charts)
  .add(Tools)
  .add(Settings)
  .add(JsonProps)
  .add(JSONEditor)
  .add(EmptyComponent)
  .add(AccountPosts)
  .add(Responsive)
  ;

window.factory = factory;

// console.log('ComponentFactory:', factory);

export default factory;
