
import React from 'react';
import shortid from 'shortid';
import faker from 'faker';
import * as mobxReact from 'mobx-react';

class ContextTest extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //
    // }
  }

  render() {
    console.log('ContextTest.props:', this.props);
    const { DataStore } = this.props;
    const { posts, getPosts, clearPosts } = this.props.menu;
    return (
      <div style={{padding: '10px'}}>
        <h4>Context Test</h4>
        <h5>Posts</h5>
        <div>
          <button onClick={getPosts}>Get Posts</button> &nbsp;
          <button onClick={clearPosts}>Clear Posts</button> &nbsp;
          <div style={{padding: '5px', height: '200px', overflow: 'auto', border: '1px solid #CCC', borderRadius: '5px', marginTop: '10px', backgroundColor: '#F0F0F0'}}>
          {
            posts.map((post, i) => {
              return (
                <div key={post.id}>{post.content} <strong>{post.category}</strong></div>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default mobxReact.observer(ContextTest);
