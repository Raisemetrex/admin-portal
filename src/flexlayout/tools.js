
import React from 'react';
// import shortid from 'shortid';

// import DataGenerator from '../lib/dataGenerator';
// import JSONData from '../lib/JSONData';

class Tools extends React.Component {
  // generateUserData = () => {
  //   DataGenerator.generateData('user').then(data => {
  //     JSONData.insert('users', data);
  //   });
  // }
  render() {
    return (
      <div style={{padding: '10px'}}>
        <div style={{textAlign: 'center'}}>
          {/*<button onClick={this.generateUserData}>Generate User Data</button>*/}
        </div>
      </div>
    )
  }
}

export default Tools;
