

import React from 'react';

import ReactTable from 'react-table';
import Form from "react-jsonschema-form";
import Moment from 'moment';


// import WooAdmin from '../data/wooAdmin';

import { filterContainsNoCase } from '../utils/reactTableFilters';

import ComponentFactory from './componentFactory';

import PropertySheet from './propertySheet';

// import filterForm1 from '../prototype/filterForm1';

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      loading: false,
      formVisible: false,
      filterData: {
      },
      filterSchema: null,
    }

    if (this.props.query.properties.filterSchema) {
      this.state.filterSchema = {...this.props.query.properties.filterSchema};
      this.state.formVisible = true;

      const { schema, uiSchema } = this.state.filterSchema;

      // console.log('1. DataTable: constructor:', {schema:{...schema}, uiSchema});

      if (uiSchema && uiSchema['ui:order']) {
        const order = uiSchema['ui:order'];
        order.forEach(item => {
          const field = uiSchema[item];

          // console.log(`schema[${item}]:`, field);

          if (field && field['ui:widget'] === 'date-time') {
            const now = Moment();
            const value = item.startsWith('end') ? now.endOf('week')
                          : (item.startsWith('start') ? now.startOf('week') : now);
            schema.default[item] = value.format(); // 'YYYY-MM-DD');
          }
        });
        // console.log('default:', schema.default);
      }

      // console.log('2. DataTable: constructor:', {schema, uiSchema});

    }

  }
  componentDidMount() {
    if (!this.state.filterSchema) {
      this.loadData();
    }
  }
  loadData = () => {
    const { filterData } = this.state;
    console.log('loadData:', {filterData});

    // const requestFiltered = {
    //   params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
    //   sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
    // };
    const { query, WooAdmin } = this.props;
    const { properties, id, params } = query;
    // const { componentOptions } = properties;

    console.log('loadData: properties:', { properties, query });

    // const { params } = properties;
    if (id) {
      this.setState({ loading: true }, () => {
        const stateUpdate = {
          loading: false,
        };
        WooAdmin.queryById({params: params || filterData || [], id})
          .then(data => {
            // console.log('query_by_id: result:', data);
            if (data.length) {
              stateUpdate.columns = WooAdmin.getReactTableColumns(data, this.props.query);
            } else {
              stateUpdate.columns = [{Header: 'No Data', accessor: 'id'}];
            }
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
    const { query, pageSize } = this.props;
    const { properties /*, id */ } = query;
    const { componentOptions } = properties;
    const { columns, loading, data, filterData } = this.state;

    const subComponentProps = {
      ...this.props,
      ...componentOptions,
      columns,
      // query,
    };
    const SubComponent = properties.SubComponent
      ? row => ComponentFactory.create(properties.SubComponent, {...subComponentProps, data: row.original })
      : row => <PropertySheet {...subComponentProps} data={row.original} />; // columns={columns} data={row} parentProps={this.props} componentOptions={componentOptions} />;

    const showPagination = data.length >= this.props.pageSize;
    const defaultPageSize = Math.max(data.length < pageSize ? data.length : pageSize, 5);
    console.log({ defaultPageSize, pageSize, length: data.length });
    const extra = {
      SubComponent,
      loading,
      loadingText: <i className="fa fa-fw fa-spinner fa-spin fa-2x" />,
      // defaultPageSize,
      // pageSize: defaultPageSize,
      showPagination,
      filterable: data.length != 0,
      defaultFilterMethod: this.props.defaultFilterMethod,
    };
    return extra;
  }
  toggleForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  }
  filterUpdate = (form) => {
    const { formData:data } = form;
    const { filterSchema } = this.state;
    const { uiSchema } = filterSchema;
    const filterData = uiSchema['ui:order'].map(item => {
      return data[item];
    });
    console.log('filterUpdate:', { filterData });
    this.setState({ filterData, formVisible: false }, this.loadData);
  }
  render() {
    console.log('DataTable: props:', this.props);
    const { columns, data, formVisible, filterSchema } = this.state;
    // console.log('DataTable:', { columns, data });
    const extraProps = this.extraProps();
    const toolbarStyle = {padding: '5px'};
    const formStyle = {padding: '5px'};
    return (
      <div>
        <div style={toolbarStyle}>
          <small>
            <button onClick={this.loadData}><i className="fa fa-fw fa-recycle" /> Refresh</button>&nbsp;
            {
              filterSchema ?
                <button onClick={this.toggleForm}><i className="fa fa-fw fa-filter" /> {formVisible ? 'Hide' : 'Show'} Form</button>
              :null
            }
          </small>
        </div>
        {
          formVisible ?
            <div style={formStyle}>
              <Form
                className="form form-wide"
                schema={filterSchema.schema}
                uiSchema={filterSchema.uiSchema}
                onSubmit={this.filterUpdate}
              />
            </div>
          : null
        }
        <ReactTable
            className={this.props.className}
            columns={columns}
            data={data}
            {...extraProps}
          />
      </div>
    )
  }
}

DataTable.defaultProps = {
  defaultFilterMethod: filterContainsNoCase,
  pageSize: 20,
  className: '-striped -highlight',
};

export default DataTable;
