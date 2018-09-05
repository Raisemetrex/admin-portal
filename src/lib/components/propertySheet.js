
import React from 'react';
import ReactTable from 'react-table';
import Inspector from 'react-inspector';

// import ReactJsonEditor from './reactJsonEditor';

import { filterContainsNoCase } from '../utils/reactTableFilters';

const columns = [
  {Header: 'Property', accessor: 'property', maxWidth: 250, style: {textAlign: 'right', fontWeight: 'bold'}},
  {Header: 'Value', accessor: 'value'},
];

function editorChangeHandler(values) {
    console.log('new values', values)
}

function PropertySheet(props) {
  console.log('props:', props);
  const { WooAdmin } = props;
  const fields = props.columns; // WooAdmin.getReactTableColumns(props.original);
  console.log({fields});
  const data = fields.map(field => {
    const { Header: property } = field;
    const value = props.original[field.accessor];
    return {
      property: `${property}:`,
      value
    }
  });
  const extraProps = {
    // style: {height: '400px'},
    // filterable: true,
  }
  return (
    <div style={{padding: '10px', backgroundColor: '#F9F9F9'}}>
      <div style={{border: '1px solid #CCC', borderRadius: '5px', padding: '10px', backgroundColor: '#FFF'}}>
        <h3>{props.title || 'Record Details'}</h3>
        {/*<Inspector data={props.original} />*/}

        <div style={{width: '1200px'}}>
          <ReactTable
            className="-striped -highlight"
            columns={columns}
            data={data}
            pageSize={data.length}
            showPagination={false}
            sortable={false}
            defaultFilterMethod={filterContainsNoCase}
            {...extraProps}
          />
        </div>

        {/*<ReactJsonEditor
          values={columns}
          onChange={editorChangeHandler}
        />
*/}
      </div>
    </div>
  )
}

export default PropertySheet;
