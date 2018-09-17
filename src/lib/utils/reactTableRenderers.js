
import React from 'react';

import type from 'type-of';

import Numeral from 'numeral';
import Moment from 'moment';


function displayJSON(props) {
  let result = props.value ? <div>{JSON.stringify(props.value)}</div> : <div className="dull">null</div>;
  switch( type(props.value) ) {
    case 'string':
      result = props.value;
      break;
    case 'number':
      result = displayNumber(props);
      break;
  }
  return result;
}

function displayNumber(props) {
  return <div>{Numeral(props.value).format(Number.isInteger(props.value) ? '0' : '0,0.000')}</div>;
}

function displayDate(props) {
  return <div>{Moment(props.value).format('YYYY-MM-DD HH:MM:SS')}</div>;
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
  if (color) style.colo = color;
  
  return {
    style,
  };
}


const renderers = {
  displayJSON,
  displayNumber,
  displayDate,
  colouredStrings,
}

export default renderers;
