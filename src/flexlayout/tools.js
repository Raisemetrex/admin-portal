
import React from 'react';
import shortid from 'shortid';

import DataGenerator from '../lib/dataGenerator';
import JSONData from '../lib/JSONData';

class Tools extends React.Component {
  generateUserData = () => {
    DataGenerator.generateData('user').then(data => {
      JSONData.insert('users', data);
    });
  }
  addReactTable(data) {
    const columns = DataGenerator.reactTableColumns('user');
    const newId = shortid.generate();
    const newTab = {
      component: 'ReactTable',
      name: `Data Table (${newId})`,
      id: `DataTable-${shortid.generate()}`,
      config: {
        columns,
        data,
        pageSize: 15,
        filterable: true,
      }
    }
    this.props.addNode(newTab);
  }
  render() {
    return (
      <div style={{padding: '10px'}}>
        {/* <h4>Tools</h4> */}
        <button onClick={this.generateUserData}>Generate User Data</button>
      </div>
    )
  }
}

export default Tools;
