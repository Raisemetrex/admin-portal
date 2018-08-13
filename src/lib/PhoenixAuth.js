
// import superAgent from 'superagent';

// import JSONAPISerializer from 'json-api-serializer';

class PhoenixAuth {

  constructor() {
    this.endpoint = `http://localhost:4000/api/v1`;
    this.account_id = null;
    // this.serializer = new JSONAPISerializer();
    // this.serializer.register('user',{
    //   id: 'id',
    //   // links: {},
    //   // relationships: {},
    // });
    // this.serializer.register('post',{
    //   id: 'id',
    //   // links: {},
    //   // relationships: {},
    // })
  }

  getAccountID(subdomain) {
    if(this.account_id !== null) {
      console.log('getAccountID: exists:', this.account_id);
      return Promise.resolve(this.account_id);
    } else {
      const account = `${this.endpoint}/accounts?subdomain=${subdomain}`;
      const options = {
        //   method: 'GET',
        //   // credentials: 'same-origin',
        //   mode: 'cors',
      };
      console.log('getAccountID: fetching:', account);

      return fetch(account, options)
        .then(result => {
          console.log('got a result:', result);
          // const json = result.json();
          return result.json();
        }, err => console.log('fetch error:', err))
        .then(json => {
          console.log('json:', json);
          this.account_id = json.data.id;
          return this.account_id;
        })
        .catch(err => {
          console.log('getAccountID: error:', err);
        })
    }
  }

  authenticate(username, password) {
    const signon = `${this.endpoint}/token`;
    const request = new FormData();
    request.append('grant_type', 'password');
    request.append('account_id', this.account_id);
    request.append('username', username);
    request.append('password', password);

    return fetch(signon, {
      method: 'POST',
      body: request,
    })
    .then(result => {
      // console.log('authentication: result:', result);
      return result.json()
    })
    .then(json => {
      // console.log('authenticate: json:', json);
      return json;
    })
    .catch(err => {
      console.log('authenticate: error:', err);
    })
  }

  test() {
    return this.getAccountID('reffind')
      .then(account_id => {
        // console.log('test: account_id:', account_id);
        return this.authenticate('gary@reffind.com', 'R3ff1nd!2017');
        // return this.authenticate('gary@reffind.com', 'bad password');
      })
      .then(auth => {
        // console.log('auth:', auth);
        if (auth) {
          this.access_token = auth.access_token;
        } else {
          throw 'Unauthorized';
        }
      })
      .then(() => {
        this.getPosts()
          .then(result => {
            console.log('test: getPosts: result:', result);
          });
      })
      // .catch(err => {
      //   console.log('authentication: error:', err);
      // })
      ;
  }

  getPosts() {
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
      return result.json()
    })
    .then(json => {
      console.log('getPosts: json:', json);
      // json.data.forEach(post => {
      //   console.log('post:', post);
      //   const record = this.serializer.deserialize(post);
      //   console.log('getPosts: deserialized:', record);
      // })
      return json;
    })
    .catch(err => {
      console.log('posts: error:', err);
    });
  }

  query(request) {
    const query = `${this.endpoint}/query`;
    console.log('running query:', request);
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
      return result.json();
    })
    // .then(json => {
    //   console.log('testQuery: json:', json);
    //   return json;
    // })
  }
}

const phoenixAuth = new PhoenixAuth();

export default phoenixAuth;
