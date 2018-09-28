
import type from 'type-of';

import humanReadable from '../utils/humanReadable';
import { filterNumber } from '../utils/reactTableFilters';
import ReactTableRenderers from '../utils/reactTableRenderers';

// this could probably be improved by switching to the REGEX test in the jsonApi module
function testForDate(value) {
  // console.log('testForDate', { value });
  if (type(value) === 'date' || type(value) === 'string') {
    const datetime = value.split('T');
    if (datetime.length === 2 && datetime[0].length === 10) {
      const d = datetime[0].split('-');
      if (d.length === 3) {
        return true;
      }
    }
  }
  return false;
}

function getType(data, key) {
  let typeFound = 'string'; // default
  for(let r = 0; r < data.length; r += 1) {
    if (data[r][key] != undefined && data[r][key] != null) {
      const value = data[r][key];
      // first non-null value - grab the type
      typeFound = type(value);
      if (testForDate(value)) {
        typeFound = 'date';
      }
      break;
    }
  }
  return typeFound;
}

function createColumn(key, data) {
  const column = {};

  column.Header = humanReadable(key);
  column.accessor = key;
  column.id = key;
  column.show = !['id','inserted_at', 'updated_at', 'deactivated_at'].includes(key);

  // console.log(`column(${type(value)}):`, { key, value} );

  switch(getType(data, key)) {
    case 'boolean':
      column.Cell = d => d.value.toString().toUpperCase();
      break;
    case 'null':
    case 'object':
      // console.log('we have an object!', { key });
      column.Cell = ReactTableRenderers.displayObject;
      break;
    case 'date':
      // console.log('we have a date!', { key });
      column.Cell = ReactTableRenderers.displayDate;
      // column.accessor = d => new Date(d.value);

      break;
    case 'number':
      // console.log('we have a number!', { key });
      column.Cell = ReactTableRenderers.displayNumber;
      column.style = {textAlign: 'right'};
      column.filterMethod = filterNumber;
      break;
    default:
      // console.log('we have a string!', { key });
      column.getProps = ReactTableRenderers.colouredStrings;
      break;
  }

  return column;
}

export function getReactTableColumns(data, query) {
  // console.log('getReactTableColumns:', { data, query });
  const columns = [];
  if (data && data.length) {
    if (
      query
      && query.properties
      && query.properties.componentOptions
      && query.properties.componentOptions.columnOrder
    ) {

      const { componentOptions } = query.properties;
      componentOptions.columnOrder.map(col => {
        // console.log('col:', col);
        if (data[0].hasOwnProperty(col)) {
          // const value = data[0][col];
          columns.push(createColumn(col, data));
        } else {
          console.assert(data[0][col], `Column ${col} not found in data:`, data[0]);
        }
      })
    } else {
      const keys = Object.keys(data[0]);
      keys.forEach(key => {
        // const value = data[0][key];
        columns.push(createColumn(key, data));
      });
    }
  } else {
    const keys = Object.keys(data);
    keys.forEach(key => {
      // const value = data[key];
      columns.push(createColumn(key, data));
    });
  }

  return columns;
}
