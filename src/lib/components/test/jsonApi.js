

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

export function getObject(included, type, id, visited, ignore) {
  let object = null;

  const foundItem = included.find(item =>
    item.type === type && item.id === id
  )

  if (foundItem) {
    const { id, attributes } = foundItem;
    const relationships = getRelationships(included, foundItem.relationships, type, id, visited, ignore);
    object = {
      id,
      ...camelCaseObject(attributes),
      ...camelCaseObject(relationships),
    }
  }

  return object;
}

export function mapRelationship(included, relationship, visited, ignore) {
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
        return getObject(included, type, id, visited, ignore);
      })
    } else {
      const { type, id } = relationship.data;
      const key = `${type}-${id}`;
      if (visited.has(key)) {
        result = relationship.link ? relationship.link : undefined;
      } else {
        visited.add(key);
        result = getObject(included, type, id, visited, ignore);
      }
    }
  } else {
    result = relationship.link ? relationship.link : null;
  }

  return result;
}

let nesting = 0;
const nestingArray = [];
export function getRelationships(included, relationships, type, id, visited, ignore) {

  // recursive stopping point
  if (nesting > 10) {
    console.log('maxiumum recursion level reached', { nestingArray, visited });
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
        mapped[key] = mapRelationship(included, relationship, visited, ignore);
      }
    });
  }

  nesting -= 1;
  nestingArray.pop();


  return mapped;
}

export function toObject(object, ignore = ['account']) {
  // console.log('jsonApiToObject:', {object});

  const { included } = object;

  if (Array.isArray(object.data)) {
    const result = object.data.map(item => {
      const visited = new Set();
      const { id, attributes, type } = item;
      const relationships = getRelationships(object.included, item.relationships, type, id, visited, ignore);
      return {
        id,
        ...camelCaseObject(attributes),
        ...camelCaseObject(relationships),
      }
    });

    return result;
  }

  const visited = new Set();
  const item = object.data;
  const { id, attributes, type } = item;
  const relationships = getRelationships(object.included, item.relationships, type, id, visited, ignore);
  return {
    id,
    ...camelCaseObject(attributes),
    ...camelCaseObject(relationships),
  }

}
