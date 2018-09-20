
const testJsonApi = require('./json-api.json');


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

export function camelCaseObject(object) {
  const result = {};
  if (!object) return result;
  Object.keys(object).forEach(key => {
    const camelKey = camelCase(key);
    result[camelKey] = object[key];
  })
  return result;
}

export function getObject(included, type, id) {
  let object = null;

  const foundItem = included.find(item =>
    item.type === type && item.id === id
  )

  if (foundItem) {
    const { id, attributes } = foundItem;
    const relationships = getRelationships(included, foundItem.relationships);
    object = {
      id,
      ...camelCaseObject(attributes),
      ...camelCaseObject(relationships),
    }
  }

  return object;
}

export function mapRelationship(included, relationship) {
  // console.log('mapRelationship: relationship:', relationship);

  let result = {...relationship};
  if (relationship.data) {
    if (Array.isArray(relationship.data)) {
      result = relationship.data.map(item => {
        const { type, id } = item;
        return getObject(included, type, id);
      })
    } else {
      const { type, id } = relationship.data;
      result = getObject(included, type, id);
    }
  } else {
    result = null;
  }

  return result;
}

let nesting = 0;
export function getRelationships(included, relationships) {

  // recursive stopping point
  if (nesting > 10) return;
  nesting += 1;

  const mapped = {};
  if (relationships) {

    // console.log('mapRelationship: included:', included);

    Object.keys(relationships).map(key => {
      const relationship = relationships[key]
      // mapped[key] = relationship.data;
      mapped[key] = mapRelationship(included, relationship);
    });
  }

  return mapped;
}

export function toObject(object) {
  // const object = JSON.parse(json);

  console.log('jsonApiToObject:', {object});

  const { included } = object;
  const result = object.data.map(item => {
    const { id, attributes } = item;
    const relationships = getRelationships(object.included, item.relationships);
    return {
      id,
      ...camelCaseObject(attributes),
      ...camelCaseObject(relationships),
    }
  });

  return result;
}

const converted = toObject(testJsonApi);
console.log('toObject: result:', converted);
console.log('customisations:', camelCaseObject(converted[0].account.customisations));
