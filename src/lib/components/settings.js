
import React from 'react';
import shortid from 'shortid';

// import WooAdmin from '../lib/data/wooAdmin';

const Me = props => {
  // console.log('Me.props:', props)
  if (props.me === null) return <div>Loading...</div>;
  return (
    <div style={{padding: '5px', border: '1px solid #CCC', borderRadius: '5px', backgroundColor: '#DDD', textAlign: 'center'}}>
      {
        props.me['profile-image-url'] ?
        <div style={{textAlign: 'center', padding: '10px'}}>
          <div className="avatar">
            <img src={props.me['profile-image-url']} />
          </div>
        </div>
        : null
      }
      <div><strong>{props.me['first-name']} {props.me['last-name']}</strong></div>
      <small>{props.me['email-address']}</small>
    </div>
  )
}

class Settings extends React.Component {

  constructor(props) {
    super(props);
    const { WooAdmin } = props;
    this.state = {
      // me: null,
      environment: WooAdmin.getEnvironment()
    }
  }

  // componentDidMount() {
  //   WooAdmin.me()
  //     .then(response => WooAdmin.getRecord(response))
  //     .then(me => {
  //       // console.log('me:', me);
  //       this.setState({ me });
  //     })
  //     .catch(err => console.log('WooAdmin.me error:', err));
  // }

  // newQuery = () => {
  //   console.log('newQuery');
  //   const newId = shortid.generate();
  //   const newTab = {
  //     component: 'NewQuery',
  //     name: `New Query ${newId}`,
  //     id: `newquery-${newId}`,
  //   }
  //
  //   this.props.addNode(newTab);
  // }

  switchEnvironment = (e) => {
    const { target } = e;
    const { value: environment } = target;
    this.setState({ environment }, () => {
      // console.log('switchEnvironment: state:', this.state);
      this.props.setEnvironment(environment);
    });
  }

  render() {
    // console.log('Settings.props:', this.props);
    const { me, environment } = this.state;
    return (
      <div style={{padding: '10px'}}>
        {/*<Me me={me} />*/}
        <div style={{textAlign: 'center', margin: '10px 10px'}}>
          <label>Environment: &nbsp;</label>
          <select onChange={this.switchEnvironment} value={environment}>
            <option value="local">Local</option>
            <option value="staging">Staging</option>
            <option value="production">Production</option>
          </select>
        </div>
        <div style={{textAlign: 'center', marginTop: '10px'}}>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      </div>
    )
  }

}

export default Settings;
