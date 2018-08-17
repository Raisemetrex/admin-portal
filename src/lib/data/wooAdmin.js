
// import superAgent from 'superagent';

import type from 'type-of';

import humanReadable from '../utils/humanReadable';

class WooAdmin {

  constructor() {
    this.endpoint = {
      local: `http://localhost:4000/api/v1`,
      staging: 'https://api.reffind.xyz',
      production: 'https://api.wooboard.com',
    }
    this.account_id = localStorage.getItem('account_id');
    this.access_token = localStorage.getItem('access_token');
    this.username = localStorage.getItem('username');
    this.database = localStorage.getItem('database');
    this.access_json = null;
  }

  getEndpoint() {
    console.assert(this.endpoint[this.database], 'Database endpoint is incorrect', this);
    return this.endpoint[this.database];
  }

  isAuthenticated = () => {
    return this.access_token !== null;
  }

  authenticate = (username, password, database) => {
    console.log('authentication:', { database });
    const signon = `${this.endpoint[database || 'local']}/token`;
    const request = new FormData();

    request.append('grant_type', 'password-subdomain');
    request.append('subdomain', 'reffind');
    // request.append('subdomain', 'garycustom');

    // request.append('grant_type', 'password');
    // request.append('account_id', null);

    request.append('username', username);
    request.append('password', password);

    // console.log('Authenticating with WooBoard...');

    return fetch(signon, {
      method: 'POST',
      // mode: 'cors',
      body: request,
    })
    .then(result => {
      // console.log('WA.authentication: result:', result);
      if (result.status !== 200) { // ??? why zero ? when no-cors
        throw {error: result.status, message: result.statusText};
      }

      // console.log('body:', result.text());

      return result.json()
    })
    .then(json => {
      // console.log('authenticate: json:', json);

      if (json && json.access_token) {
        this.access_token = json.access_token;
        this.username = username;
        this.database = database || 'local';
        localStorage.setItem('access_token', this.access_token);
        localStorage.setItem('username', username);
        localStorage.setItem('database', this.database);
        this.access_json = this.parseJwt(this.access_token);
      } else {
        throw {error: 401, message: 'Unauthorized' };
      }

      return json;
    })
  }

  getUserName = () => {
    return this.username;
  }

  reset = () => {
    this.account_id = null;
    this.access_token = null;
    this.access_json = null;
    this.username = null;
    localStorage.removeItem('account_id');
    localStorage.removeItem('access_token');
    localStorage.removeItem('database');
  }

  query = (request) => {
    const query = `${this.getEndpoint()}/query`;
    // console.log('running query:', request);
    return fetch(query, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json, application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      // mode: 'cors',
      body: JSON.stringify(request),
    })
    .then(result => {
      // console.log('testQuery: result:', result);
      if (result.status !== 200) {
        throw {error: result.status, message: result.statusText};
      }
      return result.json();
    })
  }

  logout = () => {
    this.access_token = null;
    this.access_Json = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('database');
    window.location.reload();
  }

  me = () => {
    const q = `${this.getEndpoint()}/me`;
    return this.fetch(q);
  }

  fetch = (url, data, method = 'GET') => {
    let extra = {};
    if (data) { body: JSON.stringify(data) };
    return fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json, application/vnd.api+json',
        'Content-Type': 'application/json',
      },
      ...extra,
    })
    .then(result => {
      // console.log('testQuery: result:', result);
      if (result.status !== 200) {
        throw {error: result.status, message: result.statusText};
      }
      return result.json();
    })
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  getRecord(jsonApi, index = 0) {
    console.log('WooBoard.getRecord jsonApi:', jsonApi);
    if (jsonApi.jsonapi && jsonApi.jsonapi.version === '1.0') {
      const { data } = jsonApi;
      // console.log('getRecord: jsonApi.data:', { data, index });

      let record = null;
      if (Array.isArray(data)) {
        // console.log('data isArray');
        record = data[index];
      } else {
        record = data;
      }
      record = {
        ...record.attributes,
        id: record.id,
        _type: record.type,
      }
      return record;
    }

    console.log('WooBoard.getRecord: unsupported json-api:', jsonApi);
    throw "Invalid json-api or unsupported version"
  }

  createColumn(key, value) {
    const column = {};

    column.Header = humanReadable(key);
    column.accessor = key;
    column.id = key;

    switch(type(value)) {
      case 'date':
        break;
    }

    return column;
  }

  getReactTableColumns(data, query) {
    // console.log('getReactTableColumns:', { data, query });
    const columns = [];
    if (data && data.length) {
      if (query && query.columnOrder) {
        query.columnOrder.map(col => {
          console.assert(data[0][col], `Column ${col} not found in data:`, data[0]);
          const value = data[0][col];
          columns.push(this.createColumn(col, value));
        })
      } else {
        const keys = Object.keys(data[0]);
        keys.forEach(key => {
          const value = data[0][key];
          columns.push(this.createColumn(key, value));
        });
      }
    }

    return columns;
  }

}

const wooAdmin = new WooAdmin();

export default wooAdmin;
