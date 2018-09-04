
export const filterContainsNoCase = (filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase());

const Filters = {
  filterContainsNoCase
}

export default Filters;
