
const filterForm1 = { // react-jsonschema-form
  schema: {
    title: 'Between Dates',
    type: 'object',
    required: ['startDate','endDate'],
    properties: {
      startDate: {type: 'string', title: 'Start Date'},
      endDate: {type: 'string', title: 'End Date'},
    },
    default: {
      startDate: null,
      endDate: null,
    },
  },
  uiSchema: {
    'ui:order': ['startDate', 'endDate'],
    startDate: { 'ui:widget': 'date' },
    endDate: { 'ui:widget': 'date' },
  },
};


// const freeTrialDateRange = {
//   sql: `
// SELECT
// a.id,
// a.name AS "Account Name",
// a.subdomain,
// a.inserted_at,
// a.has_demo_data,
// u.first_name,
// u.last_name,
// u.email_address,
// u.profile_image_url
// FROM accounts a
// LEFT JOIN users u ON u.current_account_id = a.id
// WHERE a.inserted_at::DATE BETWEEN $1 AND $2
// AND u.role = 'owner'
// ORDER BY a.inserted_at
//   `,
//   component: 'DataTable',
//   filterSchema: filterForm1,
//   params:['1970-01-01','2020-01-01'],
// };
//
// console.log('freeTrialDateRange[JSON]:', JSON.stringify(freeTrialDateRange));


export default filterForm1;
