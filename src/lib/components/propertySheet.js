
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

function getButtons(data, options, props) {
  let buttons = null;
  console.log('getButtons:', options);
  if (options.showPosts) {
    console.assert(props.parentProps.showPosts, `getButtons: parentProps does not contain showPosts callback:`, props.parentProps);
    buttons = (
      <div>
        <button onClick={() => props.parentProps.showPosts(data)}>Show Posts</button>
      </div>
    )
  }
  return buttons;
}

function PropertySheet(props) {
  console.log('PropertySheet: props:', props);
  const { WooAdmin } = props;
  const { query } = props.parentProps;

  const { properties } = query;
  const { componentOptions } = properties;

  console.log('options:', { componentOptions: {...componentOptions} });

  // const buttons = [...query.properties.componentOptions.buttons];
  // console.log({ buttons });
  // buttons.forEach(button => {
  //   console.log(`butt[${button.text}] => ${button.component.name} with ${JSON.stringify(button.component.props)}`);
  // })

  const fields = props.columns; // WooAdmin.getReactTableColumns(props.original);
  // console.log({fields});
  const data = fields.map(field => {
    const { Header: property } = field;
    const value = props.data.original[field.accessor];
    return {
      property: `${property}:`,
      value
    }
  });
  const extraProps = {
    // style: {height: '400px'},
    // filterable: true,
  }
  const buttons = getButtons(props.data.original, componentOptions, props);

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
