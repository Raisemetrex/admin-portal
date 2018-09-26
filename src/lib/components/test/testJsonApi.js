
import * as jsonApi from './jsonApi';

// const testJsonApi = require('./json-api.json');
const testJsonApi = require('./json-api-single.json');

const converted = jsonApi.toObject(testJsonApi);
console.log('toObject: result:', { testJsonApi, converted });
// console.log('customisations:', camelCaseObject(converted[0].account.customisations));
