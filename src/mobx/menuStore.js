
import * as mobx from 'mobx';

import WooAdmin from '../lib/data/wooAdmin';

import humanReadable from '../lib/utils/humanReadable';

class MenuStore {

  // test = mobx.observable([]);
  //
  // addTestString = mobx.action(string => {
  //   console.log('MenuStore.addTestString:', string);
  //   this.test.push(string);
  // });

  posts = mobx.observable([]);
  getPosts = mobx.action(() => {
    console.log('MenuStore.getPosts:');
    const queryId = '26EC84EA-DA77-4914-A3A7-BEFD99D94485';
    const accountId = '8BF248F5-AFAF-49F3-86D0-3E886C375ED1';
    WooAdmin.queryById({id: queryId, params: [accountId]})
      .then(posts => {
        console.log('getPosts: result:', posts);
        this.posts.replace(posts);
      })
      .catch(e => {
        console.log('PostsService.getPosts: error:', e);
        this.postErrors.replace(e);
      });
  });
  clearPosts = mobx.action(() => {
    this.posts.replace([]);
  })

  map = mobx.observable(new Map());

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
    // {
    //   key: 'hidden',
    //   title: 'Hidden',
    //   open: false,
    //   disabled: true,
    //   children: [],
    // },
  ]);

  add = mobx.action(item => {
    // console.log('MenuStore.add:', item);
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

  find(path) {
    return this.map.get(path);
  }

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

  setHidden(state) {
    const node = this.findByPath('hidden');
    // console.log('setHidden:', { node, state });
    if (node) node.hide = state;
  }

}

const hidden = {
  key: 'hidden',
  title: 'Hidden',
  open: true,
  children: [],
  hide: true,
}

const menuStore = new MenuStore();

// if (['local'].includes(WooAdmin.getEnvironment())) {
  menuStore.add(hidden);
// }

function extendMenu(queries) {
  // console.log('extendMenu:', queries);
  queries.forEach(query => {
    // console.log({ query })
    const { menuPath, properties } = query;
    if (properties && menuPath) {
      // console.log({ menuPath, properties, query });

      menuStore.map.set(menuPath, query);

      const { component } = properties;
      // console.log({ menuPath, component});
      const path = menuPath.split('.');
      const rootItem = menuStore.findByPath(path.slice(0,-1));
      // console.assert(rootItem, `Could not find root menu item: ${menuPath}`);
      // console.log('rootItem:', rootItem);
      if (rootItem) {
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
      } else {
        console.log(`could not find rootItem for ${path.slice(0,-1)} - skipping`);
      }
    }
  });

}

function extendMenuFromDB() {
  WooAdmin.rest('/admin/queries')
    .then(result => {
      // console.log('extendMenuFromDB: result:', result);
      if (result) {
        extendMenu(result);
        // extendMenu(result.map(item => {
        //   const {
        //     id,
        //     insertedAt,
        //     updatedAt,
        //     menuPath,
        //     menuOrder,
        //     properties,
        //     permissions,
        //   } = item;
        //   const result = {
        //     id,
        //     properties,
        //     permissions,
        //     menuPath,
        //     menuOrder,
        //     insertedAt,
        //     updatedAt
        //   };
        //   // console.log('processing item:', { item, result });
        //   return result;
        // }));
      } else {
        console.log('extendMenuFromDB: result is null!');
      }
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

window.menuStore = menuStore;


export default menuStore;
