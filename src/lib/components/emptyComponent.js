
import React from 'react';
import { ipsum } from '../utils/random';
import shortid from 'shortid';

function EmptyComponent(props) {
  console.log('EmptyComponent.props:', props);
  const content = ipsum();
  return (
    <div style={{padding: '10px'}}>
      <h4>{props.title || 'Empty Component'}</h4>
      <p>This is a component placeholder - there is nothing to display.</p>
        {
          content.map(row => {
            return <p key={shortid.generate()}>{row}</p>
          })
        }
    </div>
  )
}

export default EmptyComponent;
