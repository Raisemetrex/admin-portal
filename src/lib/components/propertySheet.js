
import React from 'react';
import ReactTable from 'react-table';
import Inspector from 'react-inspector';
import shortid from 'shortid';

// import ReactJsonEditor from './reactJsonEditor';

import { filterContainsNoCase } from '../utils/reactTableFilters';

const columns = [
  {Header: 'Property', accessor: 'property', maxWidth: 250, style: {textAlign: 'right', fontWeight: 'bold'}},
  {Header: 'Value', accessor: 'value'},
];

function editorChangeHandler(values) {
    console.log('new values', values)
}

function getButtons(props) {
  const { buttons, data } = props;
  const result = [];
  // console.log('getButtons:', buttons);
  if (buttons) {
    buttons.map(button => {
      const { action, text, props: actionProps } = button;
      // console.log('button:', {text, action, actionProps: {...actionProps} });
      if (props[action]) {
        result.push(
          <button key={shortid.generate()} onClick={() => props[action](data, props, actionProps)}>{text}</button>
        )
      }
    })
    return (
      result ?
        <div style={{padding: '5px', marginTop: '5px', marginBottom: '10px', border: '1px solid #DDD', borderRadius: '5px', backgroundColor: '#EEE'}}>
          {result}
        </div>
      : null
    );
  }
  return null;
}

function PropertySheet(props) {
  // console.log('PropertySheet: props:', props);

  const { WooAdmin, query, componentOptions } = props;

  // console.log('options:', { componentOptions: {...componentOptions} });

  const fields = props.columns;
  // console.log({fields});
  const data = fields.map(field => {
    const { Header: property } = field;
    const value = props.data[field.id];
    return {
      property: `${property}:`,
      value
    }
  });
  const extraProps = {
    // style: {height: '400px'},
    // filterable: true,
  }
  const buttons = getButtons(props);

  return (
    <div style={{padding: '10px', backgroundColor: '#F9F9F9'}}>
      <div style={{border: '1px solid #CCC', borderRadius: '5px', padding: '10px', backgroundColor: '#FFF'}}>
        <h3>{props.title || 'Record Details'}</h3>

        {buttons}

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
