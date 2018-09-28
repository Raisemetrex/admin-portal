
import Type from 'type-of';

function objectToTree(object, options, path = '') {
  console.log('objectToTree:', { object, path });
  const result = [];
  const keys = Object.keys(object);
  keys.forEach(key => {
    const parentPath = `${path}/${key}`;
    const value = object[key];
    const type = Type(value);
    const item = {
      id: key,
      label: `${key} (${type})`,
      type,
      path: parentPath,
    }
    console.log({ item });
    switch(item.type) {
      case 'object':
        item.children = objectToTree(value, options, parentPath);
        // item.path = parentPath;
        break;
      case 'array':
        // item.path = parentPath;
        item.children = value.map((child, index) => {
          const thisPath = `${path}/${index}`;
          const childType = Type(child);
          const childItem = {
            id: index,
            label: child,
            label: `${index}: ${childType === 'string' ? child : `(${childType})`}`,
            path: thisPath,
          };
          if (childType === 'string') {
            childItem.value = child;
          } else {
            childItem.children = objectToTree(child, options, thisPath);
          }
          return childItem;
        });
        break;
      default:
        item.value = value;
        break;
    }
    result.push(item);
  });

  return result;
}

export default objectToTree;
