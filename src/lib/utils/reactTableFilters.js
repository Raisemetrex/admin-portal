
export const filterContainsNoCase = (filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase());

export const filterNumber = (filter, row) => {
  const filterValue = filter.value;
  const hasOperator = ['!','<','>','=','^'].includes(filterValue.charAt(0));
  if (hasOperator) {
    const operator = filterValue.charAt(0);
    const value = filterValue.slice(1);
    let result = false;

    // they are still entering a boolean value - so return true until we have a number
    if (value === null || value === '') return true;

    const fieldValue = (new Number(row[filter.id])).valueOf();
    const matchValue = (new Number(value)).valueOf();

    switch (operator) {
      case '<': // less then
        result = fieldValue < matchValue;
        break;
      case '>': // greater than
        result = fieldValue > matchValue;
        // console.log(`operator[${operator}]:`, {fieldValue, matchValue, result})
        break;
      case '!': // NOT equal
        result = fieldValue != matchValue;
        break;
      case '=': // exactly equal to
        result = fieldValue === matchValue;
        break;
      case '^': // between - inclusive
        const splitValue = value.split(' ');
        const lowerValue = new Number(splitValue[0]).valueOf();
        const upperValue = new Number(splitValue[1]).valueOf();
        result =  fieldValue >= lowerValue && fieldValue <= upperValue;
        break;
    }
    // console.log('filterNumber: operator: result:', result);
    return result;
  } else {
    return filterContainsNoCase(filter,row);
  }
}

const Filters = {
  filterContainsNoCase,
  filterNumber,
};

export default Filters;
