

import React from 'react';

import ReactTable from 'react-table';

// import WooAdmin from '../data/wooAdmin';

import { filterContainsNoCase } from '../utils/reactTableFilters';

import ComponentFactory from './componentFactory';

import PropertySheet from './propertySheet';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      loading: false,
    }
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    // const requestFiltered = {
    //   params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
    //   sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
    // };
    const { query, WooAdmin } = this.props;
    const { properties, componentOptions, id } = query;

    // console.log('loadData: properties:', { properties, query });

    const { sql, params } = properties;
    if (id) {
      this.setState({ loading: true }, () => {
        const stateUpdate = {
          loading: false,
        };
        WooAdmin.queryById({sql, params: params || [], id})
          .then(data => {
            // console.log('query_by_id: result:', data);
            stateUpdate.columns = WooAdmin.getReactTableColumns(data, this.props.query);
            stateUpdate.data = data;
          })
          .catch(err => {
            console.log('DataTable.loadData: error:', err)
          })
          .finally(() => {
            this.setState(stateUpdate);
          });
      });
    } else {
      throw "Executing SQL directly has been deprecated"
      // WooAdmin.query({sql, params: params || [], id})
      //   .then(data => {
      //     console.log('direct query: result:', data);
      //     const columns = WooAdmin.getReactTableColumns(data, this.props.query);
      //     this.setState({ data, columns });
      //   })
      //   .catch(err => console.log('DataTable.loadData: error:', err));
    }
  }
  extraProps = () => {
    const { query } = this.props;
    const { properties, componentOptions, id } = query;
    const { columns, loading } = this.state;
    // const subComponentProps = {
    //   // ...row,
    //   columns,
    // };
    const SubComponent = properties.SubComponent
                          ? row => ComponentFactory.create(properties.SubComponent, {values: row.original})
                          : row => <PropertySheet columns={columns} {...row} />;
    const extra = {
      SubComponent,
      loading,
      loadingText: <i className="fa fa-fw fa-spinner fa-spin fa-2x" />
    };
    return extra;
  }
  render() {
    // console.log('DataTable: props:', this.props);
    // const { component, componentOptions, formSchema, params, sql } = this.props.query.properties;
    // console.log('DataTable: props.query.properies:', {
    //   component,
    //   componentOptions,
    //   formSchema,
    //   params,
    //   sql,
    // });

    const { columns, data } = this.state;
    // console.log('DataTable:', { columns, data });
    const extraProps = this.extraProps();
    return (
      <ReactTable
          className={this.props.className}
          columns={columns}
          data={data}
          defaultPageSize={this.props.pageSize}
          filterable
          defaultFilterMethod={this.props.defaultFilterMethod}
          {...extraProps}
        />
    )
  }
}

DataTable.defaultProps = {
  defaultFilterMethod: filterContainsNoCase,
  pageSize: 20,
  className: '-striped -highlight',
};

export default DataTable;
