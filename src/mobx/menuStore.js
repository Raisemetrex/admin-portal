
import * as mobx from 'mobx';

import humanReadable from '../lib/utils/humanReadable';

// console.log({ mobx });

// mobx.useStrict(true);

class MenuStore {

  data = mobx.observable([
    {
      key: 'dashboard',
      title: 'Dashboard',
      'data-action': {
        id: 'DashboardTab'
      }
    },
    {
      key: 'reports',
      title: 'Reports',
      open: true,
      'data-action': {
        enableRename: false,
        id: 'reports',
        name: 'Reports',
        component: 'Reports',
      },
      children: [],
    },
    {
      key: 'charts',
      title: 'Charts',
      open: true,
      'data-action': {
        enableRename: false,
        id: 'charts',
        name: 'Charts',
        component: 'Charts',
      },
      children: [],
    },

  ]);

  add = mobx.action(item => {
    this.data.push(item);
  });

  append = mobx.action(child => {
    const path = Array.isArray(child.menuPath) ? child.menuPath : child.menuPath.split('.');

    const key = path.slice(-1)[0];
    const title = humanReadable(key);
    const newItem = {
      key,
      title,
      'data-action': {
        name: title,
        id: key,
        component: child.properties.component,
        query: child,
      }
    };

    const item = this.findByPath(path.slice(0,-1));
    if (item) {
      item.children.push(newItem);
    }
  })

  findByPath(path, children = null) {

    // children || console.log('findByPath:', {data: this.data, path});

    path = Array.isArray(path) ? path : path.split('.');
    children = children || this.data;

    for(let i = 0; i < children.length; i += 1) {
      const child = children[i];
      if (child.key === path[0]) {
        // drill down
        if (path.length > 1) {
          // see if there are any children and drill down
          // otherwise we will stop
          if (child.children && child.children.length) {
            return this.findByPath(path.slice(1), child.children);
          } else {
            break;
          }
        } else {
          // this must be the node
          return child;
        }
      }
      // loop around to the next one
    }

    // we did not match - so return NULL
    return null;
  }

}

const menuStore = new MenuStore();

const seedMenu = [
  {
    id: null,
    menuPath: 'reports.all-users',
    menuOrder: 0,
    permissions: '*',
    properties: {
      sql: 'SELECT * FROM users',
      params: [],
      formSchema: null,
      component: 'DataTable',
      componentOptions: {key: 'id'},
    },
  },
  {
    id: null,
    menuPath: 'reports.some-users',
    menuOrder: 0,
    permissions: '*',
    properties: {
      sql: 'SELECT id, first_name, last_name, email_address, inserted_at FROM users WHERE current_account_id = $1',
      params: ['F3071089-E566-405A-B3D0-12C163C57887'],
      formSchema: null,
      component: 'DataTable',
      componentOptions: {
        key: 'id',
        columnOrder: ['first_name', 'last_name', 'email_address', 'inserted_at'],
      },
    },
  },
  {
    id: null,
    menuPath: 'reports.all-accounts',
    menuOrder: 0,
    permissions: '*',
    properties: {
      sql: 'SELECT * FROM accounts',
      params: [],
      formSchema: null,
      component: 'DataTable',
      componentOptions: {key: 'id'},
    },
  },
  {
    id: null,
    menuPath: 'charts.posts-pie-chart',
    menuOrder: 0,
    permissions: '*',
    properties: {
      sql: `
    SELECT
    category,
    COUNT(*)
    FROM posts
    GROUP BY category
      `,
      params: [],
      formSchema: null,
      component: 'PieChart',
      componentOptions: {key: 'category'},
    },
  },
  {
    id: null,
    menuPath: 'charts.posts-by-month',
    menuOrder: 0,
    permissions: '*',
    properties: {
      sql: `
      SELECT
        date_trunc('month',inserted_at) AS mon,
        count(*)
      FROM
        posts
      GROUP BY 1
      ORDER BY date_trunc('month', inserted_at)
      `,
      params: [],
      formSchema: null,
      component: 'BarChart',
      componentOptions: {key: 'mon'},
    },
  },
];

function extendMenu(queries) {
  // console.log('extendMenu:', queries);
  queries.forEach(query => {
    // console.log({ query })
    const { menuPath, properties } = query;
    // console.log({ menuPath, properties });
    const { component } = properties;
    // console.log({ menuPath, component});
    const path = menuPath.split('.');
    const rootItem = menuStore.findByPath(path.slice(0,-1));
    console.assert(rootItem, `Could not find root menu item: ${menuPath}`);
    // console.log('rootItem:', rootItem);
    const key = path.slice(-1)[0];
    const title = humanReadable(key);
    const newItem = {
      key,
      title,
      'data-action': {
        name: title,
        id: key,
        component,
        query,
      }
    };
    rootItem.children.push(newItem);
  });

  // console.log('menuStore: extended:', menuStore);
}

// extendMenu(seedMenu);

function extender() {
  extendMenu(seedMenu);
}

export { extender };


export default menuStore;
