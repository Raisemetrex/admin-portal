


import React from 'react';

import ReactTable from 'react-table';

import WooAdmin from '../data/wooAdmin';
import ComponentFactory from './componentFactory';

import { filterContainsNoCase } from '../utils/reactTableFilters';
import ReactTableRenderers from '../utils/reactTableRenderers';

class QueryComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
      showAsDiff: true,
      showAsJson: false,
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
    const { componentOptions } = this.props;
    // console.log('componentDidMount: props:', this.props);
    WooAdmin.queryComparison('local', 'production')
      .then(result => {
        const { showAsJson, showAsDiff } = this.state;
        const { compare } = result;
        const notEqual = compare.filter(item => item.equal === false);
        const columns = WooAdmin.getReactTableColumns(notEqual, {componentOptions});
        columns.forEach(column => {
          if (['local','staging','production'].includes(column.id) && showAsJson) {
            column.Cell = ReactTableRenderers.displayJSON;
          }
          if (['local','production','presence','_equal'].includes(column.id) && showAsDiff) column.show = false;
          if (['menu_path','equal','presence'].includes(column.id)) column.width = 160;
        })
        const data = notEqual.map((item,i) => {
          return {
            ...item,
            _expandLevel: 10,
            _index: i,
          }
        });
        if (showAsDiff) {
          columns.push({
            Header: 'Differences',
            Cell: ReactTableRenderers.jsonDiffPatch,
            id: 'differences',
            width: 5000,
            accessor: d => `${JSON.stringify(d.local ? d.local.properties : {})}-${JSON.stringify(d.production ? d.production.properties : {})}`,
          })
        }
        this.setState({ data, columns });
      })
      .catch(err => {
        console.log('QueryComparison: didMount: error:', err)
      });
  }
  trProps = (state, ri, ci, instance) => {
    return {
      onDoubleClick: e => {
        const { original } = ri;
        const data = [...this.state.data];
        data[original._index]._expandLevel = original._expandLevel === 0 ? 20 : 0,
        this.setState({ data });
      }
    }
  }

  showAsDiff = () => {
    this.setState({ showAsDiff: true, showAsJson: false }, this.loadData);
  }

  showAsJson = () => {
    this.setState({ showAsDiff: false, showAsJson: true }, this.loadData);
  }

  render() {
    // console.log('RestTable.props:', this.props);
    const { columns, data, error } = this.state;
    const toolbarStyle = {padding: '5px'};

    // console.log('QueryComparison.state:', this.state);
    // return <div>Testing</div>

    if (error) {
      return (
        <div dangerouslySetInnerHTML={{__html: error}} />
      )
    }
    return (
      <div>
        <div style={toolbarStyle}>
          <small>
            <button onClick={this.loadData}><i className="fa fa-fw fa-recycle" />Refresh</button>&nbsp;
            <button onClick={this.showAsDiff}><i className="fa fa-fw fa-recycle" />Diff</button>&nbsp;
            <button onClick={this.showAsJson}><i className="fa fa-fw fa-recycle" />JSON</button>&nbsp;
          </small>
        </div>
        <ReactTable
            className={this.props.className}
            columns={columns}
            data={data}
            defaultPageSize={this.props.pageSize}
            filterable
            defaultFiltered={[{id: 'equal', value: 'FALSE'}]}
            defaultFilterMethod={this.props.defaultFilterMethod}
            getTrProps={this.trProps}
          />
      </div>
    )
  }
}

QueryComparison.defaultProps = {
  defaultFilterMethod: filterContainsNoCase,
  pageSize: 20,
  className: '-striped -highlight',
};

ComponentFactory.add(QueryComparison,'QueryComparison');

export default QueryComparison;
