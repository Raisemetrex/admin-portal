
import React from 'react';
import shortid from 'shortid';

import Loading from './loading';

// import WooAdmin from '../lib/data/wooAdmin';

const Me = props => {
  // console.log('Me.props:', props)
  const { me } = props;
  // console.log('me:', me);
  return (
    <div style={{padding: '5px', border: '1px solid #CCC', borderRadius: '5px', backgroundColor: '#EEE', textAlign: 'center'}}>
      <div style={{backgroundColor: '#DDD', borderRadius: '5px'}}>
        {
          !me ?
            <Loading />
          :
            <div>
              <strong>{me.auth_provider}</strong>
              {
                me.avatar ?
                <div style={{textAlign: 'center', padding: '10px'}}>
                  <div className="avatar">
                    <img src={me.avatar} width="32px" height="32px"/>
                  </div>
                </div>
                : null
              }
              <div>
                <strong>{me.first_name} {me.last_name}</strong>
              </div>
              <div>
                <small>{me.email}</small>
              </div>
            </div>
        }
      </div>
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

  componentDidMount() {
    const { WooAdmin } = this.props;
    WooAdmin.me()
      .then(result => {
        console.log('me result:', result);
        const me = result && result.length ? result[0] : {empty: true}
        console.log('me:', me);
        this.setState({ me });
      });
  }

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
        <Me me={me} />
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
