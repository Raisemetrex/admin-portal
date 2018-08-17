
class QueryStore {
  queries = [];

  report() {
    // console.log('QueryStore.queries:', this.queries);
    return [...this.queries];
  }

  add(query) {
    this.queries.push(query);
  }

  find(menuPath) {
    return this.queries.find(q => q.menuPath === menuPath);
  }

}

const queryStore = new QueryStore();

queryStore.add({
  sql: 'SELECT * FROM users',
  params: [],
  formSchema: null,
  menuPath: 'reports.all-users',
  permissions: '*',
  component: 'DataTable',
});

queryStore.add({
  sql: 'SELECT first_name, last_name, email_address, inserted_at FROM users WHERE current_account_id = $1',
  params: ['F3071089-E566-405A-B3D0-12C163C57887'],
  columnOrder: ['first_name', 'last_name', 'email_address', 'inserted_at'],
  formSchema: null,
  menuPath: 'reports.some-users',
  permissions: '*',
  component: 'DataTable',
});

queryStore.add({
  sql: 'SELECT * FROM accounts',
  params: [],
  formSchema: null,
  menuPath: 'reports.all-accounts',
  permissions: '*',
  component: 'DataTable',
});

queryStore.add({
  sql: `
SELECT
category,
COUNT(*)
FROM posts
GROUP BY category
  `,
  params: [],
  formSchema: null,
  menuPath: 'charts.posts-pie-chart',
  permissions: '*',
  component: 'PieChart',
});

queryStore.add({
  sql: `
  SELECT
    date_trunc('month',inserted_at) AS mon,
    count(*)
  FROM
    posts
  GROUP BY 1
  ORDER BY date_trunc('month', inserted_at)
  `,
  params: [],
  formSchema: null,
  menuPath: 'charts.posts-by-month',
  permissions: '*',
  component: 'BarChart',
})

queryStore.report();

export default queryStore;
