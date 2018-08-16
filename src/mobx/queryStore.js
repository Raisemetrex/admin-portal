
class QueryStore {
  queries = [];

  report() {
    // console.log('QueryStore.queries:', this.queries);
    return [...this.queries];
  }

  add(query) {
    this.queries.push(query);
  }

}

const queryStore = new QueryStore();

queryStore.add({
  sql: 'SELECT * FROM users',
  params: [],
  formSchema: null,
  menuPath: 'reports.all-users',
  permissions: '*',
  component: 'JsonProps',
});

queryStore.add({
  sql: 'SELECT * FROM acounts',
  params: [],
  formSchema: null,
  menuPath: 'reports.all-accounts',
  permissions: '*',
  component: 'JsonProps',
});

queryStore.report();

export default queryStore;
