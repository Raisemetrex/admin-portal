

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelCase(input) {
  const fragments = input.split(/_|-/g);
  const output = fragments.map((frag, i) => {
    return i ? capitalizeFirstLetter(frag) : frag;
  }).join('')
  return output;
}

export function camelCaseObject(object, convertDates) {
  const result = {};
  if (!object) return result;
  Object.keys(object).forEach(key => {
    const camelKey = camelCase(key);
    result[camelKey] = convertDates ? convertToJSDate(object[key]) : object[key];
  })
  return result;
}

export function getObject(included, type, id, visited, ignore, convertDates) {
  let object = null;

  if (included) {
    const foundItem = included.find(item =>
      item.type === type && item.id === id
    )

    if (foundItem) {
      const { id, attributes } = foundItem;
      const relationships = getRelationships(included, foundItem.relationships, type, id, visited, ignore, convertDates);
      object = {
        id,
        ...camelCaseObject(attributes, convertDates),
        ...camelCaseObject(relationships, convertDates),
      }
    }
  } else {
    object = {
      id
    }
  }

  return object;
}

export function mapRelationship(included, relationship, visited, ignore, convertDates) {
  // console.log('mapRelationship: relationship:', relationship);

  let result = {...relationship};
  if (relationship.data) {
    if (Array.isArray(relationship.data)) {
      result = relationship.data.map(item => {
        const { type, id } = item;
        const key = `${type}-${id}`;
        if (visited.has(key)) {
          return relationship.link ? relationship.link : undefined;
        }
        visited.add(key);
        return getObject(included, type, id, visited, ignore, convertDates);
      })
    } else {
      const { type, id } = relationship.data;
      const key = `${type}-${id}`;
      if (visited.has(key)) {
        result = relationship.link ? relationship.link : undefined;
      } else {
        visited.add(key);
        result = getObject(included, type, id, visited, ignore, convertDates);
      }
    }
  } else {
    result = relationship.link ? relationship.link : null;
  }

  return result;
}

let nesting = 0;
const maxNesting = 10;
const nestingArray = [];
export function getRelationships(included, relationships, type, id, visited, ignore, convertDates) {

  // recursive stopping point
  if (nesting > maxNesting) {
    console.assert(nesting < maxNesting, 'maxiumum recursion level reached', { nestingArray, visited });
    throw new Error('maxiumum recursion level reached' );
    return;
  }

  nestingArray.push({nesting, id, type, relationships});
  nesting += 1;

  const mapped = {};
  if (relationships) {

    // console.log('mapRelationship: included:', included, relationships, type);

    Object.keys(relationships).map(key => {
      if (!ignore.includes(key)) {
        const relationship = relationships[key]
        mapped[key] = mapRelationship(included, relationship, visited, ignore, convertDates);
      }
    });
  }

  nesting -= 1;
  nestingArray.pop();


  return mapped;
}

function transform(item, included, ignore, convertDates) {

  const { id, attributes, type } = item;
  const visited = new Set();
  const relationships = getRelationships(included, item.relationships, type, id, visited, ignore, convertDates);
  let transformed = {
    id,
    ...camelCaseObject(attributes, convertDates),
    ...camelCaseObject(relationships, convertDates),
  }
  return transformed;

}

function isJsonApi(jsonApi) {
  if (jsonApi.jsonapi) console.assert(jsonApi.jsonapi.version === '1.0', `Error: isJsonApi: unsupported jsonapi version: ${jsonApi.jsonapi.version}`);
  return (jsonApi.jsonapi && jsonApi.jsonapi.version === '1.0');
}

function convertToJSDates(object) {
  const result = {};
  const reDate = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
  Object.keys(object).forEach(key => {
    result[key] = reDate.test(object[key]) ? new Date(object[key]) : object[key];
  })
  return result;
}

function convertToJSDate(value) {
  const reDate = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
  return reDate.test(value) ? new Date(value) : value;
}

export function toObject(object, {ignore = ['account'], convertDates = true, debug = false} = {}) {
  if (debug) console.log('jsonApi.toObject: array:', object);

  if (!object) return object;

  if (isJsonApi(object)) {
    const { included } = object;

    if (Array.isArray(object.data)) {
      const result = object.data.map(item => {
        const transformed = transform(item, object.included, ignore, convertDates);

        // const { id, attributes, type } = item;
        // const visited = new Set();
        // const relationships = getRelationships(object.included, item.relationships, type, id, visited, ignore, convertDates);
        // let transformed = {
        //   id,
        //   ...camelCaseObject(attributes),
        //   ...camelCaseObject(relationships),
        // }

        return transformed;
      });

      return result;
    }

    if (debug) console.log('jsonApi.toObject: object:', object);

    const transformed = transform(object.data, object.included, ignore, convertDates);

    // const item = object.data;
    // const { id, attributes, type } = item;
    // const visited = new Set();
    // const relationships = getRelationships(object.included, item.relationships, type, id, visited, ignore, convertDates);
    // let transformed = {
    //   id,
    //   ...camelCaseObject(attributes),
    //   ...camelCaseObject(relationships),
    // }

    return transformed;

  } else {
    if (Array.isArray(object)) {
      if (debug) console.log('jsonApiToObject: array of data: converting:', {convertDates});
      return object.map(ob => {
        return camelCaseObject(ob, convertDates);
      })
    } else {
      if (debug) console.log('jsonApiToObject: single object: converting:', {convertDates});
      return camelCaseObject(object, convertDates);
    }
  }

}
