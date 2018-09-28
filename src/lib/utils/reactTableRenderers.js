
import React from 'react';
import Inspector from 'react-inspector';
import JsonDiffReact from 'jsondiffpatch-for-react';

import type from 'type-of';

import Numeral from 'numeral';
import Moment from 'moment';


function displayObject(props) {
  // console.log('displayObject: props:', props);
  // let result = props.value ? <div>{JSON.stringify(props.value, null, '\t')}</div> : <div className="dull">null</div>;
  let result = props.value ? <Inspector data={props.value} expandLevel={props.original._expandLevel} /> : <div className="dull">null</div>;
  switch( type(props.value) ) {
    case 'boolean':
      result = props.value.toString();
      break;
    case 'string':
      result = props.value;
      break;
    case 'number':
      result = displayNumber(props);
      break;
  }
  return result;
}

function displayJSON(props) {
  // console.log('displayJSON: props:', props);
  const { columnProps } = props;
  const { element } = columnProps.rest;
  let result = props.value ? <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(props.value[element], null, 0)}</pre> : <div className="dull">null</div>;
  // let result = props.value ? <div style={{wordWrap: 'break-word'}}><Inspector data={props.value.properties} expandLevel={props.original._expandLevel} /></div> : <div className="dull">null</div>;
  return result;
}

function jsonDiffPatch(props) {
  const { local, production } = props.original;
  return (
    <JsonDiffReact
      right={local ? local.properties || {} : {}}
      left={production ? production.properties || {} : {}}
      show={false}
    />
  );
}

function displayNumber(props) {
  return <div>{Numeral(props.value).format(Number.isInteger(props.value) ? '0' : '0,0.000')}</div>;
}

function displayDate(props) {
  return <div>{props.value ? Moment(props.value).format('YYYY-MM-DD HH:MM:SS') : <span className="dull">null</span>}</div>;
}

function colouredStrings(state, ri, ci) {
  // console.log('colouredStrings:', { ri, ci, state });
  if (!ri) return {};

  let backgroundColor = null;
  let color = null;

  const value = ri.original[ci.id];
  switch(value) {
    case 'active':
      backgroundColor = 'green';
      color = 'white';
      break;
    case 'partial':
      backgroundColor = 'yellow';
      color = 'black';
      break;
    case 'inactive':
      backgroundColor = 'red';
      color = 'white';
      break;
  }

  const style = {};
  if (backgroundColor) style.backgroundColor = backgroundColor;
  if (color) style.color = color;

  return {
    style,
  };
}


const renderers = {
  displayJSON,
  displayObject,
  displayNumber,
  displayDate,
  colouredStrings,
  jsonDiffPatch,
}

export default renderers;
