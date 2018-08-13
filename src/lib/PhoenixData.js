//
// import superAgent from 'superagent';

class PhoenixData {
  constructor() {
    const server = 'app.reffind.local'
    this.endPoint = `http://${server}:4000/admin/api/v1`;
    this.credentials = {
      cookie: null,
      root: null,
      email: null,
      password: null,
    }
    this.authResult = null;
  }

  authenticate(email, password) {
    console.assert(root, `Request: Error: root is required`);
    console.assert(email, `Request: Error: email is required`);
    console.assert(password, `Request: Error: password is required`);

    if (this.authResult) {
      console.log('already authenticated ${this.credentials.email} with Pheonix:', this.credentials.root);
      return new Promise(res => { res(this.authResult) });
    }

    const signinURL = `${this.endPoint}/signin`;
    this.credentials = {
      ...this.credentials,
      root,
      email,
      password,
    }

    console.log(`authenticating '${email}' with Phoenix:`);


    return fetch(signinURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password }),
    })
    .then(res => {
        console.log('Admin API Auth Test: result:', res);
        console.log('cookie:', res.headers.get('set-cookie') );

        const cookie = res.headers.get('set-cookie');
        this.credentials.cookie = cookie;
        this.authResult = res;

        return res;
    })
    // .then(result => {
    //     console.log('json:', result);
    // })
    .catch(e => {
        console.log('Admin API Auth Test: Error: ',e);
    });

    // return superAgent.post(signinURL)
    //   .send({ email, password })
    //   .withCredentials()
    //   .then(res => {
    //
    //     console.log('authenticated');
    //
    //     const [ cookie ] = res.headers['set-cookie'];
    //     this.credentials.cookie = cookie;
    //     this.authResult = res;
    //
    //     console.log('credentials:', this.credentials);
    //
    //     return this.authResult;
    //   })
    //   .catch(err => {
    //     console.log('authentication: Error:', err);
    //   })

  }


  listUsers() {
      const url = `${this.endPoint}/users`; // 'http://localhost:4000/admin/api/v1/users'
      fetch(url,{
          method: 'get',
          // mode: 'cors',
          // credentials: 'same-origin',
      })
      .then(result => {
          console.log('list result:', result);
          return result.json()
      })
      .then(result => {
          console.log('json:', result)
      })
      .catch(e => {
          console.log('listUsers: Error: ',e);
      })
  }

}

const instance = new PhoenixData();

export default instance;
