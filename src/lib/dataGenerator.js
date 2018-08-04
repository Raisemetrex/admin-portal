
import jsf from 'json-schema-faker';

jsf.extend('faker', () => {
  return require('faker');
})

const user = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/positiveInt'
        },
        name: {
          type: 'string',
          faker: 'name.findName'
        },
        email: {
          type: 'string',
          format: 'email',
          faker: 'internet.email'
        }
      },
      required: ['id', 'name', 'email']
    }
  },
  required: ['user'],
  definitions: {
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true
    }
  }
};

const Schema = {
  user,
};

class DataGenerator {
  generateData(schemaName) {
    const results = [];
    for (let i = 0; i < 20; i += 1) {
      results.push(jsf.resolve(Schema[schemaName]).then(result => result[schemaName]));
      // .then(result => {
      //   // console.log(`${schemaName}:`, result);
      //   return result;
      // }));
    }
    return Promise.all(results);
  }
  reactTableColumns(schemaName) {
    const schema = Schema[schemaName];
    const properties = Object.keys(schema.properties[schemaName].properties);
    return properties.map(property => {
      return {
        Header: property.toUpperCase(),
        accessor: property,
      }
    })
  }
}

const dataGenerator = new DataGenerator();

export default dataGenerator;
