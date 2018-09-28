
// import superAgent from 'superagent';

import React from 'react';

// import type from 'type-of';
import shortid from 'shortid';

// import Numeral from 'numeral';
// import Moment from 'moment';

import { toObject as jsonApiToObject } from '../utils/jsonApi';

class WooAdmin {

  constructor() {
    this.endpoint = {
      local: `http://localhost:4000/api/v1`,
      staging: 'https://api.reffind.xyz/api/v1',
      production: 'https://api.wooboard.com/api/v1',
    }
    this.environment = null;
    this.access_token = null;

    this.environment = localStorage.getItem('environment');
    if (this.environment) {
      this.access_token = localStorage.getItem(`${this.environment}_access_token`);
    }
  }

  getEnvironment() {
    // if (this.environment === null) this.environment = localStorage.getItem('environment');
    return this.environment;
  }

  getDesktopEndpoint(subdomain) {
    let root = null;
    const environment = this.getEnvironment();
    switch (environment) {
      case 'local': root = `http://${subdomain}.reffind.local:4200`; break;
      case 'staging': root = `https://${subdomain}.reffind.xyz`; break;
      case 'production': root = `https://${subdomain}.wooboard.com`; break;
    }
    console.assert(root, `Error: getDesktopEndpoint: root is null`);
    return root;
  }

  setEnvironment(environment) {
    console.assert(environment === null || ['local','staging','production'].includes(environment), `setEnvironment: Invalid environment: ${environment}`);
    // console.log('WooAdmin.setEnvironment:', environment)
    this.environment = environment;
    localStorage.setItem('environment', environment);
    if (this.environment) {
      this.access_token = localStorage.getItem(`${this.environment}_access_token`);
    }
    console.log('WooAdmin: environment:', {
      environment,
      access_token: this.access_token,
    });
  }

  setAccessToken(token, environment = null) {
    console.assert(environment === null || ['local','staging','production'].includes(environment), `setAccessToken: Invalid environment: ${environment}`);
    this.access_token = token;
    if (environment) this.setEnvironment(environment);
    // this.environment = environment ? environment : localStorage.getItem();
    localStorage.setItem(`${this.environment}_access_token`, token);
    // localStorage.setItem('environment', environment);
    console.log('setAccessToken:', { WooAdmin: this });
  }

  getEndpointFor(environment) {
    console.assert(this.endpoint[environment], `getEndpointFor: The ${environment} doesn't exist!`);
    return this.endpoint[environment];
  }

  getTokenFor(environment) {
    const token = localStorage.getItem(`${environment}_access_token`);
    console.assert(token, `getTokenFor: The token for ${environment} does not exist!`);
    return token;
  }

  getEndpoint() {
    console.assert(this.endpoint, 'getEndpoint: endpoint is null');
    console.assert(this.endpoint[this.environment], 'getEndpoint: Environment endpoint is incorrect', {
      endpoint: this.endpoint[this.environment],
    });
    return this.endpoint[this.environment];
  }

  getFeedEndpoint() {
    console.assert(this.endpoint, 'getFeedEndpoint: endpoint is null');
    console.assert(this.endpoint[this.environment], 'getFeedEndpoint: Environment endpoint is incorrect', {
      endpoint: this.endpoint[this.environment],
    });
    const [http, ...rest] = this.endpoint[this.environment].split(/\/\//gi);
    return `${http}//${rest[0].split('/')[0]}`;
  }

  isAuthenticated = () => {
    const { environment, access_token } = this;
    // console.log('WooAdmin.isAuthenticated:', {
    //   environment,
    //   access_token
    // });
    return this.environment && this.access_token !== null;
  }

  // authenticate = (username, password, database) => {
  //   console.log('authentication:', { database });
  //   const signon = `${this.endpoint[database || 'local']}/token`;
  //   const request = new FormData();
  //
  //   request.append('grant_type', 'password-subdomain');
  //   request.append('subdomain', 'reffind');
  //   request.append('username', username);
  //   request.append('password', password);
  //
  //   // console.log('Authenticating with WooBoard...');
  //
  //   return fetch(signon, {
  //     method: 'POST',
  //     body: request,
  //   })
  //   .then(result => {
  //     // console.log('WA.authentication: result:', result);
  //     if (result.status !== 200) { // ??? why zero ? when no-cors
  //       throw {error: result.status, message: result.statusText};
  //     }
  //
  //     // console.log('body:', result.text());
  //
  //     return result.json()
  //   })
  //   .then(json => {
  //     // console.log('authenticate: json:', json);
  //
  //     if (json && json.access_token) {
  //       this.access_token = json.access_token;
  //       this.username = username;
  //       this.database = database || 'local';
  //       localStorage.setItem('access_token', this.access_token);
  //       localStorage.setItem('username', username);
  //       localStorage.setItem('database', this.database);
  //       this.access_json = this.parseJwt(this.access_token);
  //     } else {
  //       throw {error: 401, message: 'Unauthorized' };
  //     }
  //
  //     return json;
  //   })
  // }

  getUserName = () => {
    return this.username;
  }

  reset = (clearToken = false) => {
    if (clearToken) {
      localStorage.removeItem(`${this.environment}_access_token`);
      this.access_token = null;
    }
    localStorage.removeItem('environment');
    this.environment = null;
  }

  queryById = (request) => {
    const query = `${this.getEndpoint()}/admin/query_by_id`;
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
      if (result.status !== 200) {
        throw {error: result.status, message: `WooAdmin.query: ${result.statusText}`};
      }
      return result.json();
    })
    // .then(json => {
    //   console.log('queryById: json:', json);
    //   return json;
    // })
    .catch(err => {
      console.error(`WooAdmin: queryById: error:`, err);
      throw new Error(err.message);
    })
  }

  rest = (path, { method = 'GET', environment = 'local', request = undefined } = {}) => {
    // console.log('WooAdmin.rest:', {method, environment, request});
    if (!this.isAuthenticated()) {
      // console.error(`rest: not authenticated`);
      return Promise.reject(`rest: not authenticated`);
    }
    // console.log('WooAdmin.rest: path:', path);
    const query = `${this.getEndpointFor(environment)}${path}`;
    const access_token = this.getTokenFor(environment);
    return fetch(query, {
      method,
      headers: {
        'Authorization': `Bearer ${access_token || this.access_token}`,
        'Accept': 'application/json, application/vnd.api+, text/html, text/plain',
        'Content-Type': 'application/json',
      },
      body: method.toUpperCase() === 'POST' ? JSON.stringify(request) : undefined,
    })
    .then(async result => {
      if (result.status === 200) {
        return result.json();
      }
      return {error: result.status, text: await result.text()};
    })
    .then(jsonApi => {
      if (jsonApi.hasOwnProperty('error')) {
        return jsonApi;
      } else {
        const result = jsonApiToObject(jsonApi);
        // console.log('WooAdmin.rest: jsonApi:', result);
        return result;
      }
    })
  }

  queryComparison = async (leftEnvironment, rightEnvironment) => {
    const comparison = {};
    comparison.left = await this.rest('/admin/queries', {environment: leftEnvironment});
    comparison.right = await this.rest('/admin/queries', {environment: rightEnvironment});

    comparison.leftKeys = new Set(comparison.left.map(item => item.menuPath));
    comparison.rightKeys = new Set(comparison.right.map(item => item.menuPath));
    comparison.uniqueKeys = new Set([...comparison.leftKeys, ...comparison.rightKeys]);
    comparison.compare = [];
    comparison.uniqueKeys.forEach((value, key, o) => {
      const leftItem = comparison.left.filter(item => item.menuPath === key).pop();
      const rightItem = comparison.right.filter(item => item.menuPath === key).pop();
      let presence = 0;
      let equal = false;
      if (!leftItem) presence = 1;
      if (!rightItem) presence = -1;
      if (presence === 0) {
        equal = JSON.stringify(leftItem.properties) === JSON.stringify(rightItem.properties);
      }
      comparison.compare.push(
        {
          id: shortid.generate(),
          menuPath: key,
          [leftEnvironment]: leftItem,
          [rightEnvironment]: rightItem,
          presence,
          equal,
        }
      );
    });

    return comparison;
  }

  logout = () => {
    // console.log('WooAdmin.logout:',{
    //   environment: this.environment,
    //   jwt: this.getJwt(),
    // })
    this.reset();
    window.location.reload();
  }

  me = () => {

    // console.log('me:', {
    //   environment: this.environment,
    //   jwt: this.getJwt(),
    //   endpoint: this.getEndpoint(),
    // });

    const q = `${this.getEndpoint()}/admin/me`;
    // return this.fetch(q);
    return fetch(q, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json, application/vnd.api+, text/html, text/plain',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(request),
    })
    .then(async result => {
      if (result.status === 200) {
        return result.json();
      }
      return {error: result.status, text: await result.text()};
    })
  }

  // fetch = (url, data, method = 'GET') => {
  //   let extra = {};
  //   if (data) {
  //     extra = {
  //       ...extra,
  //       body: JSON.stringify(data)
  //     };
  //   }
  //   return fetch(url, {
  //     method,
  //     headers: {
  //       'Authorization': `Bearer ${this.access_token}`,
  //       'Accept': 'application/json, application/vnd.api+json',
  //       'Content-Type': 'application/json',
  //     },
  //     ...extra,
  //   })
  //   // .then(result => {
  //   //   // console.log('testQuery: result:', result);
  //   //   if (result.status !== 200) {
  //   //     throw {error: result.status, message: result.statusText};
  //   //   }
  //   //   return result.json();
  //   // })
  // }

  getJwt() {
    return this.access_token ? this.parseJwt(this.access_token) : null;
  }

  // getTestJwt() {
  //   return this.parseJwt(this.test_token);
  // }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  // getDataFromJsonAPI(jsonApi) {
  //
  //   return jsonApiToObject(jsonApi);
  //
  //   // let result = null;
  //   // const data = this.getDataset(jsonApi);
  //   // if (Array.isArray(data)) {
  //   //   result = data.map(item => {
  //   //     return this.getDataFromJsonRecord(item);
  //   //   });
  //   // } else {
  //   //   result = data;
  //   // }
  //   // return result;
  // }

  // getDataFromJsonRecord(item) {
  //   if (item.attributes) {
  //     const record = {
  //       ...item.attributes,
  //       id: item.id,
  //       _type: item.type,
  //     }
  //     return record;
  //   }
  //   return item;
  // }

  // isJsonApi(jsonApi) {
  //   return (jsonApi.jsonapi && jsonApi.jsonapi.version === '1.0');
  // }

  // getDataset(jsonApi) {
  //   if (jsonApi.jsonapi && jsonApi.jsonapi.version === '1.0') {
  //     const { data } = jsonApi;
  //     return data;
  //   }
  //   return jsonApi;
  //
  //   // console.log('WooBoard.getDataset: unsupported json-api:', jsonApi);
  //   // throw "Invalid json-api or unsupported version"
  // }

  // getDatasetLength(jsonApi) {
  //
  //   if (jsonApi.jsonapi && jsonApi.jsonapi.version === '1.0') {
  //     const { data } = jsonApi;
  //     // console.log('getRecord: jsonApi.data:', { data, index });
  //
  //     let length = 1;
  //     if (Array.isArray(data)) {
  //       // console.log('data isArray');
  //       length = data.length;
  //     }
  //     return length;
  //   }
  //
  //   console.log('WooBoard.getDatasetLength: unsupported json-api:', jsonApi);
  //   throw "Invalid json-api or unsupported version"
  // }

  // getRecord(jsonApi, index = 0) {
  //   // console.log('WooBoard.getRecord jsonApi:', jsonApi);
  //   if (jsonApi.jsonapi && jsonApi.jsonapi.version === '1.0') {
  //     const { data } = jsonApi;
  //     // console.log('getRecord: jsonApi.data:', { data, index });
  //
  //     let record = null;
  //     if (Array.isArray(data)) {
  //       // console.log('data isArray');
  //       record = data[index];
  //     } else {
  //       record = data;
  //     }
  //     record = this.getDataFromJsonRecord(record);
  //     return record;
  //   }
  //
  //   console.log('WooBoard.getRecord: unsupported json-api:', jsonApi);
  //   throw "Invalid json-api or unsupported version"
  // }


}

// function displayJSON(props) {
//   let result = props.value ? <div>{JSON.stringify(props.value)}</div> : <div className="dull">null</div>;
//   switch( type(props.value) ) {
//     case 'string':
//       result = props.value;
//       break;
//     case 'number':
//       result = displayNumber(props);
//       break;
//   }
//   return result;
// }

// function displayNumber(props) {
//   return <div>{Numeral(props.value).format(Number.isInteger(props.value) ? '0' : '0,0.000')}</div>;
// }
//
// function displayDate(props) {
//   return <div>{Moment(props.value).format('YYYY-MM-DD HH:MM:SS')}</div>;
// }
//
// function colouredStrings(state, ri, ci) {
//   // console.log('colouredStrings:', { ri, ci, state });
//   if (!ri) return {};
//   let backgroundColor = 'inherit';
//   let color = 'inherit';
//   const value = ri.original[ci.id];
//   switch(value) {
//     case 'active':
//       backgroundColor = 'green';
//       color = 'white';
//       break;
//     case 'partial':
//       backgroundColor = 'yellow';
//       color = 'black';
//       break;
//     case 'inactive':
//       backgroundColor = 'red';
//       color = 'white';
//       break;
//   }
//   const style = {
//     backgroundColor,
//     color,
//   };
//   return {
//     style,
//   };
// }
//
const wooAdmin = new WooAdmin();

window.WooAdmin = wooAdmin;

export default wooAdmin;
