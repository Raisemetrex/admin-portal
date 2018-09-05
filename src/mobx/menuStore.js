
import * as mobx from 'mobx';

import WooAdmin from '../lib/data/wooAdmin';

import humanReadable from '../lib/utils/humanReadable';

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
      // disabled: true,
      open: false,
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

function extendMenu(queries) {
  // console.log('extendMenu:', queries);
  queries.forEach(query => {
    // console.log({ query })
    const { menuPath, properties } = query;
    if (properties && menuPath) {
      // console.log({ menuPath, properties, query });
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
          component: component || 'DataTable',
          query,
        }
      };
      rootItem.children.push(newItem);
    }
  });

}

function extendMenuFromDB() {
  WooAdmin.rest('/queries')
    .then(result => {
      extendMenu(result.map(item => {
        const {
          id,
          inserted_at: insertedAt,
          updated_at: updatedAt,
          menu_path: menuPath,
          menu_order: menuOrder,
          properties,
          permissions,
        } = item;
        return {
          id,
          properties,
          permissions,
          menuPath,
          menuOrder,
          insertedAt,
          updatedAt
        }
      }));
    })
    .catch(err => {
      console.log('extendMenuFromDB: error:', err);
    })
}

function extenderMenuFromDB() {
  extendMenuFromDB();
}

export { extenderMenuFromDB };

extenderMenuFromDB();
// extender();

// window.menuStoreData = menuStore.data;


export default menuStore;
