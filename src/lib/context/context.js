
import React from 'react';

import WooAdmin from '../data/wooAdmin';

import DataStore from './dataStore';

// import PostsService .....;

class PostsService {
  constructor(controller) {
    this.controller = controller;
    // this.posts = [];
    this.register(controller);
  }
  register(controller) {
    controller.addState('posts', []);
    controller.addState('users', []);
    // controller.addState('WooAdmin', WooAdmin);
    controller.addMethod('addPost', this.addPost);
    controller.addMethod('clearPosts', this.clearPosts);
    controller.addMethod('getPosts', this.getPosts);
    controller.addMethod('getUsers', this.getUsers);
  }
  addPost = (post) => {
    // this.posts.unshift(post);
    const posts = [...this.controller.state.posts];
    posts.unshift(post);
    this.updateController({ posts });
  }
  clearPosts = () => {
    // this.posts = [];
    this.updateController({ posts: [] });
  }
  getPosts = () => {
    const queryId = '26EC84EA-DA77-4914-A3A7-BEFD99D94485';
    const accountId = '8BF248F5-AFAF-49F3-86D0-3E886C375ED1';
    WooAdmin.queryById({id: queryId, params: [accountId]})
      .then(posts => {
        // this.posts = posts;
        this.updateController({ posts });
      })
      .catch(e => {
        console.log('PostsService.getPosts: error:', e);
      })
  }

  getUsers = () => {
    const queryId = '3CE92B27-B975-4E68-95E6-4B402E138060';
    WooAdmin.queryById({id: queryId, params: []})
      .then(users => {
        // this.posts = posts;
        this.updateController({ users });
      })
      .catch(e => {
        console.log('PostsService.getUsers: error:', e);
      })
  }

  updateController = (state) => {
    this.controller.setState(state);
  }
}

// const postsService = new PostsService();

class Context extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // UserService,
    };

    // this.methods = {};
    //
    // this.postService = new PostsService(this);

  }

  // addState = (item, value) => {
  //   this.state[item] = value;
  // }
  //
  // addMethod = (method, f) => {
  //   this.methods[method] = f;
  // }

  render () {
    const value = {
      ...this.state,
      // ...this.methods,
    }
    return (
      <DataStore.Provider value={value}>
        {this.props.children}
      </DataStore.Provider>
    )
  }
}

export default Context;
