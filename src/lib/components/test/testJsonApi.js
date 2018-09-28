
import * as jsonApi from '../../utils/jsonApi';

// const testJsonApi = require('./json-api.json');
// const testJsonApi = require('./json-api-single.json');
const testJsonApi = require('./json-api-no-included.json');

const converted = jsonApi.toObject(testJsonApi);
// console.log('toObject: result:', { testJsonApi, converted });
