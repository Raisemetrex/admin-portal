


import React from 'react';

import ReactTable from 'react-table';

import WooAdmin from '../data/wooAdmin';
import ComponentFactory from './componentFactory';
import Loading from './loading';

import { filterContainsNoCase } from '../utils/reactTableFilters';
import ReactTableRenderers from '../utils/reactTableRenderers';
import { getReactTableColumns } from '../utils/reactTableColumns';

class QueryComparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: null,
      showAsDiff: true,
      showAsJson: false,
      selected: null,
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
        // const { showAsJson, showAsDiff } = this.state;
        const { compare } = result;
        const notEqual = compare; // compare.filter(item => item.equal === false);
        const columns = getReactTableColumns(notEqual, {componentOptions});

        // decorate the case columns as required
        columns.forEach(column => {
          if (['local','staging','production'].includes(column.id)) {
            column.Cell = ReactTableRenderers.displayJSON;
            column.getProps = (state, ri, ci) => {
              return {
                element: 'properties',
              };
            }
          }
          if (['presence'].includes(column.id)) {
            column.Cell = d => d.value === 0 ? '<=>' : (d.value < 1 ? '<=' : '=>');
          }
          // if (['local','production','presence','_equal'].includes(column.id)) column.show = true;
          if (['menuPath','equal','presence'].includes(column.id)) column.width = 160;
        })

        // add in the "difference" column
        columns.push({
          Header: 'Differences',
          Cell: ReactTableRenderers.jsonDiffPatch,
          id: 'differences',
          width: 5000,
          show: false,
          accessor: d => `${JSON.stringify(d.local ? d.local.properties : {})}-${JSON.stringify(d.production ? d.production.properties : {})}`,
        })

        // augment the data
        // const data = notEqual.map((item,i) => {
        //   return {
        //     ...item,
        //     // _expandLevel: 10,
        //     // _index: i,
        //   }
        // });

        this.setState({ data: notEqual, columns });
      })
      .catch(err => {
        console.log('QueryComparison: didMount: error:', err)
      });
  }

  tdProps = (state, ri, ci, instance ) => {
    const { selected } = this.state;
    return {
      style: {
        backgroundColor: selected && ri && selected === ri.original.id ? 'pink': 'inherit',
      },
    };
  }

  trProps = (state, ri, ci, instance) => {
    return {
      onClick: (e, handleOriginal) => {
        const { original } = ri;
        const { selected } = this.state;

        this.setState({ selected: selected === original.id ? null : original.id });

        // const selected = original._selected;
        // const data = [...this.state.data];
        // data.forEach(record => {
        //   record._selected = false;
        // })
        // data[original._index]._selected  = selected ? false : true;
        // this.setState({ data, selected: data[original._index]._selected ? original._index : null }
        //   //, () => console.log('updated selected:', data[original._index])
        // );
        if (handleOriginal) handleOriginal();
      },
    }
  }

  showAsDiff = () => {
    const columns = [...this.state.columns];
    columns.forEach(column => {
      if (['local','production','presence','_equal'].includes(column.id)) column.show = false;
      if (['differences'].includes(column.id)) column.show = true;
    });
    this.setState({ showAsDiff: true, showAsJson: false, columns });
  }

  showAsJson = () => {
    // this.setState({ showAsDiff: false, showAsJson: true }, this.loadData);
    const columns = [...this.state.columns];
    columns.forEach(column => {
      if (['local','production','presence','_equal'].includes(column.id)) column.show = true;
      if (['differences'].includes(column.id)) column.show = false;
    });
    this.setState({ showAsDiff: false, showAsJson: true, columns });
  }

  copyJSONtoClipboard = () => {
    const { selected } = this.state;
    if (selected) {
      const record = this.state.data.filter(record => record.id === selected).pop();
      if (record) {
        const { presence, local, production } = record;
        console.log('toClipboard: record:', record);
        const properties = presence < 0 ? local.properties : (presence > 0 ? production.properties : local.properties);
        if (properties) {
          navigator.clipboard.writeText(JSON.stringify(properties).replace(/\\n|\n/g, ' '))
            .then(result => {
              // console.log('copied OK:', result)
            })
            .catch(e => {
              console.log('copy error:', e);
            })
        }
      } else {
        console.log('copyJSONtoClipboard: no record');
      }
    }
  }

  render() {
    // console.log('QueryComparison.props:', this.props);
    // console.log('QueryComparison.state:', this.state);
    const { columns, data, error, selected } = this.state;
    const toolbarStyle = {
      padding: '5px',
      position: 'sticky',
      backgroundColor: '#DDD',
      top: 0,
      zIndex: 1000,
    };

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
            <button onClick={this.copyJSONtoClipboard} disabled={selected !== null ? false: true}><i className="fa fa-fw fa-recycle"/>Copy to Clipboard</button>&nbsp;
          </small>
        </div>
        <ReactTable
            className={this.props.className}
            columns={columns}
            data={data ? data : []}
            loading={data === null ? true : false}
            loadingText={<i className="fa fa-fw fa-spinner fa-spin fa-2x" />}
            pageSize={data ? data.length : 0}
            pagination={false}
            filterable
            defaultFiltered={[{id: 'equal', value: 'FALSE'}]}
            defaultFilterMethod={this.props.defaultFilterMethod}
            getTrProps={this.trProps}
            getTdProps={this.tdProps}
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
