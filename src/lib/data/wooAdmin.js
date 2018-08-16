
// import superAgent from 'superagent';

class WooAdmin {

  constructor() {
    this.endpoint = `http://localhost:4000/api/v1`;
    this.account_id = localStorage.getItem('account_id');
    this.access_token = localStorage.getItem('access_token');
    this.access_json = null;
  }

  isAuthenticated = () => {
    return this.access_token !== null;
  }

  // getAccountID = (subdomain) => {
  //   if(this.account_id !== null) {
  //     // console.log('getAccountID: exists:', this.account_id);
  //     return Promise.resolve(this.account_id);
  //   } else {
  //     const account = `${this.endpoint}/accounts?subdomain=${subdomain}`;
  //     const options = {
  //       //   method: 'GET',
  //       //   // credentials: 'same-origin',
  //       //   mode: 'cors',
  //     };
  //     // console.log('getAccountID: fetching:', account);
  //
  //     return fetch(account, options)
  //       .then(result => {
  //         if (result.status !== 200) {
  //           throw {error: result.status, message: result.statusText};
  //         }
  //         // console.log('got a result:', result);
  //         // const json = result.json();
  //         return result.json();
  //       }, err => console.log('fetch error:', err))
  //       .then(json => {
  //         // console.log('json:', json);
  //         this.account_id = json.data.id;
  //         return this.account_id;
  //       })
  //       // .catch(err => {
  //       //   console.log('getAccountID: error:', err);
  //       // })
  //   }
  // }

  authenticate = (username, password) => {
    const signon = `${this.endpoint}/token`;
    const request = new FormData();
    request.append('grant_type', 'password');
    request.append('account_id', this.account_id);
    request.append('username', username);
    request.append('password', password);

    console.log('Authenticating with WooBoard...', this.account_id);

    return fetch(signon, {
      method: 'POST',
      body: request,
    })
    .then(result => {
      // console.log('authentication: result:', result);
      if (result.status !== 200) {
        throw {error: result.status, message: result.statusText};
      }
      return result.json()
    })
    .then(json => {
      // console.log('authenticate: json:', json);

      if (json && json.access_token) {
        this.access_token = json.access_token;
        localStorage.setItem('access_token', this.access_token);
        this.access_json = this.parseJwt(this.access_token);
      } else {
        throw {error: 401, message: 'Unauthorized' };
      }

      return json;
    })
    // .catch(err => {
    //   console.log('authenticate: error:', err);
    // })
  }

  getPosts = () => {
    const posts = `${this.endpoint}/posts?limit=10&start=0`;
    return fetch(posts, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.access_token}`,
        'Accept': 'application/json', // , application/vnd.api+json',
      },
      mode: 'cors',
    })
    .then(result => {
      // console.log('getPosts: result:', result);
      if (result.status !== 200) {
        throw {error: result.status, message: result.statusText};
      }
      return result.json()
    })
    .then(json => {
      // console.log('getPosts: json:', json);
      return json;
    })
    // .catch(err => {
    //   console.log('posts: error:', err);
    // });
  }

  query = (request) => {
    const query = `${this.endpoint}/query`;
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
    // .then(json => {
    //   console.log('testQuery: json:', json);
    //   return json;
    // })
  }

  logout = () => {
    this.access_token = null;
    this.access_Json = null;
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  me = () => {
    const q = `${this.endpoint}/me`;
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

}

const wooAdmin = new WooAdmin();

export default wooAdmin;
