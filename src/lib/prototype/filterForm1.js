
const filterForm1 = { // react-jsonschema-form
  schema: {
    title: 'Between Dates',
    type: 'object',
    required: [
      // 'status',
      'startDate',
      'endDate'
    ],
    properties: {
      startDate: {type: 'string', title: 'Start Date'},
      endDate: {type: 'string', title: 'End Date'},
      buttons: {type: 'string', title: 'Buttons '},
      // status: {type: 'string', enum: ['free-trial','paying-customer','free-account'], enumNames: ['Free Trial','Paying Customer','Free Account'], title: 'Status'},
    },
    default: {
      startDate: null,
      endDate: null,
      // status: '',
    },
  },
  uiSchema: {
    'ui:field': 'layout',
    'ui:layout': [
      // { status: { md: 6 }},
      {
        startDate: { md: 6 },
        endDate: { md: 6 },
        buttons: { md: 12 },
      },
    ],
    'ui:order': [
      // 'status',
      'startDate',
      'endDate'
    ],
    buttons: {
      'ui:field': 'buttons',
      'ui:buttons': [
        { label: 'This Week', action: 'thisWeek' },
        { label: 'Last Week', action: 'lastWeek' },
        { label: 'This Month', action: 'thisMonth'},
        { label: 'Last Month', action: 'lastMonth' },
        { label: 'Last 3 Months', action: 'last3Months' },
      ],
    },
    startDate: { 'ui:widget': 'date' },
    endDate: { 'ui:widget': 'date-time' },
    // status: { 'ui:widget': 'select' },
  },
};


// "filterSchema": {"schema": {"type": "object", "title": "BETWEEN Dates",
// "default": {"endDate": null, "startDate": null}, "required": ["startDate",
// "endDate"], "properties": {"endDate": {"type": "string", "title": "END Date"},
// "startDate": {"type": "string", "title": "START Date"}}}, "uiSchema":
// {"endDate": {"ui:widget": "date-time"}, "ui:order": ["startDate", "endDate"],
// "startDate": {"ui:widget": "date-time"}}}

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
