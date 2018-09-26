

import React from 'react';

import ReactTable from 'react-table';
// import LayoutField from 'react-jsonschema-form-layout';
import Form from 'react-jsonschema-form';
import LayoutField from '../utils/form/layout';
import FormButtons from '../utils/form/buttons';
import Moment from 'moment';


// import WooAdmin from '../data/wooAdmin';

import { filterContainsNoCase } from '../utils/reactTableFilters';

import ComponentFactory from './componentFactory';

import PropertySheet from './propertySheet';

import filterForm1 from '../prototype/filterForm1';

const fields = {
  layout: LayoutField,
  buttons: FormButtons,
}

// console.log({ fields });

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      filtered: [],
      loading: false,
      formVisible: false,
      filterData: {
      },
      filterSchema: null,
    }

    if (this.props.query.properties.filterSchema) {
      // this.state.filterSchema = {...this.props.query.properties.filterSchema};
      this.state.filterSchema = {...filterForm1};
      this.state.formVisible = true;

      const { schema, uiSchema } = this.state.filterSchema;

      // console.log('1. DataTable: constructor:', {schema:{...schema}, uiSchema});

      if (uiSchema) {
        if (uiSchema['ui:order']) {
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
        }

        if (uiSchema.buttons && uiSchema.buttons['ui:buttons']) {
          uiSchema.buttons['ui:buttons'] = uiSchema.buttons['ui:buttons'].map(button => {
            return {
              ...button,
              onClick: action => {
                console.log('button click:', action);
                this.setDateRange(action);
              },
            };
          })
        }
      }

      // console.log('2. DataTable: constructor:', {schema, uiSchema});

    }

  }
  setDateRange = (action) => {
    let stateUpdate = null;
    let now = Moment();
    switch(action) {
      case 'lastWeek':
        now = now.subtract('week', 1);
      case 'thisWeek':
        stateUpdate = {
          filterData: {
            startDate: now.startOf('week').format(),
            endDate: now.endOf('week').format(),
          }
        };
        break;

      case 'lastMonth':
        now = now.subtract('month', 1);
      case 'thisMonth':
        stateUpdate = {
          filterData: {
            startDate: now.startOf('month').format(),
            endDate: now.endOf('month').format(),
          }
        };
        break;

      case 'last3Months':
        stateUpdate = {
          filterData: {
            endDate: now.endOf('month').format(),
          }
        };
        now = now.subtract('month', 3);
        stateUpdate.filterData.startDate = now.startOf('month').format();
        break;
    }
    if (stateUpdate) {
      stateUpdate.formData = { ...stateUpdate.filterData };
      this.setState(stateUpdate);
    }
  }
  componentDidMount() {
    // console.log('componentDidMount:', this.props.id);
    if (!this.state.filterSchema) {
      this.loadData();
    }
  }
  loadData = () => {
    const { filterData } = this.state;
    // console.log('loadData:', {filterData});

    // const requestFiltered = {
    //   params: ['2018-01-22','2018-01-23T23:59:59Z','8BF248F5-AFAF-49F3-86D0-3E886C375ED1'],
    //   sql: 'SELECT * FROM users WHERE inserted_at BETWEEN $1 and $2 AND current_account_id = $3',
    // };
    const { query, WooAdmin } = this.props;
    const { properties, id, params } = query;
    // const { componentOptions } = properties;

    // console.log('loadData: properties:', { properties, query });

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
    const { columns, loading, data, filterData, filtered } = this.state;
    const { doubleClick } = componentOptions || {};

    const subComponentProps = {
      ...this.props,
      ...componentOptions,
      columns,
      // query,
    };
    const SubComponent = properties.SubComponent
      ? row => ComponentFactory.create(properties.SubComponent, {...subComponentProps, data: row.original })
      : row => <PropertySheet {...subComponentProps} data={row.original} />; // columns={columns} data={row} parentProps={this.props} componentOptions={componentOptions} />;

    const showPagination = data.length >= this.props.defaultPageSize; //  : true : false;
    // const defaultPageSize = Math.max(data.length < pageSize ? data.length : pageSize, 5);
    // console.log({ defaultPageSize, pageSize, length: data.length });
    const extra = {
      SubComponent,
      loading,
      loadingText: <i className="fa fa-fw fa-spinner fa-spin fa-2x" />,
      // defaultPageSize,
      // pageSize: defaultPageSize,
      showPagination,
      filterable: data.length != 0,
      defaultFilterMethod: this.props.defaultFilterMethod,
      defaultPageSize: this.props.defaultPageSize,
      filtered,
      onFilteredChange: this.onFilteredChange,
    };
    if (doubleClick) {
      // console.log({ doubleClick });
      extra.getTrProps = (state, ri, ci, instance) => {
        const { heading, component, subheadingColumn } = doubleClick;
        return {
          onDoubleClick: (e, handleOriginal) => {
            const { original: data } = ri;
            const { id } = ri.original;
            const subHeading = subheadingColumn && data[subheadingColumn] ? `: ${data[subheadingColumn]}` : '';
            const name = `${heading}${subHeading}`;
            // console.log('DblClick: row.id:', { id, heading, component, subHeading });
            const node = {
              id,
              name,
              component,
              config: {
                data
              },
            };

            this.props.addNode(node);

            if (handleOriginal) handleOriginal();
          }
        }
      }
    }
    return extra;
  }
  onFilteredChange = (filtered) => {
    this.setState({ filtered });
  }
  toggleForm = () => {
    this.setState({ formVisible: !this.state.formVisible });
  }
  filterUpdate = (form) => {
    const { formData } = form;
    const { filterSchema } = this.state;
    const { uiSchema } = filterSchema;
    const filterData = uiSchema['ui:order'].map(item => {
      return formData[item];
    });
    // console.log('filterUpdate:', { filterData });
    this.setState({ filterData, formVisible: false, formData }, this.loadData);
  }
  clearFilter = () => {
    // console.log('filtered:', this.state.filtered);
    this.setState({ filtered: [] });
  }
  render() {
    // console.log('DataTable: props:', this.props);
    const { columns, data, formVisible, filterSchema, formData } = this.state;
    // console.log('DataTable:', { columns, data });
    // console.log('formData:', formData);
    const extraProps = this.extraProps();
    const toolbarStyle = {padding: '5px'};
    const formStyle = {padding: '5px'};
    return (
      <div>
        {
          filterSchema ?
            <div style={formStyle}>
              <small>
                <button onClick={this.toggleForm}><i className="fa fa-fw fa-filter" /> {formVisible ? 'Hide' : 'Show'} Form</button>
              </small>
              {
                formVisible ?
                <Form
                  className="form form-wide"
                  schema={filterSchema.schema}
                  fields={fields}
                  uiSchema={filterSchema.uiSchema}
                  onSubmit={this.filterUpdate}
                  formData={formData}
                />
                :null
              }
            </div>
          :null
        }
        <div style={toolbarStyle}>
          <small>
            <button onClick={this.loadData}><i className="fa fa-fw fa-recycle" /> Refresh</button>&nbsp;
            <button onClick={this.clearFilter}><i className="fa fa-fw fa-ban" /> Clear Filter</button>&nbsp;
          </small>
        </div>
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
  defaultPageSize: 10,
  className: '-striped -highlight',
};

export default DataTable;
