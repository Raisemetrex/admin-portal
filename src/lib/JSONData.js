
import request from 'superagent';

class JSONData {

  constructor() {
    this.port = 3090;
    this.jsonServer = `http://localhost:${this.port}`;
  }

  insert(schemaName, data) {
    
    // console.log(`JSONData.insert(${schemaName}):`, data);
    
    const results = [];
    data.forEach(item => {
      results.push(
        request
          .post(`${this.jsonServer}/${schemaName}`)
          .withCredentials()
          .send(item)
          .then(res => {
            // console.log('JSONData.insert: res:', res);
            return res;
          })
          .catch(err => {
            console.log('JSONData.insert: error:', err);
          })
        );
    });
    Promise.all(results).then(r => {
      // console.log('results:', r);
    });
    
  }
  
}

const jsonData = new JSONData();

export default jsonData;
