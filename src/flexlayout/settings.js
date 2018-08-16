
import React from 'react';

import WooAdmin from '../lib/data/wooAdmin';

const Me = props => {
  console.log('Me.props:', props)
  if (props.me === null) return <div>Loading...</div>;
  return (
    <div style={{padding: '5px', border: '1px solid #CCC', borderRadius: '5px', backgroundColor: '#DDD'}}>
      {
        props.me['profile-image-url'] ?
        <div style={{textAlign: 'center', padding: '10px'}}>
          <img src={props.me['profile-image-url']} />
        </div>
        : null
      }
      <div>First Name: {props.me['first-name']}</div>
      <div>Last Name: {props.me['last-name']}</div>
      <div>Email: {props.me['email-address']}</div>
    </div>
  )
}

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      me: null,
    }
  }

  componentDidMount() {
    WooAdmin.me()
      .then(response => WooAdmin.getRecord(response))
      .then(me => {
        console.log('me:', me);
        this.setState({ me });
      })
      .catch(err => console.log('WooAdmin.me error:', err));
  }

  render() {
    const { me } = this.state;
    return (
      <div style={{padding: '10px'}}>
        <Me me={me} />
        <div style={{textAlign: 'center', marginTop: '10px'}}>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      </div>
    )
  }

}

export default Settings;
