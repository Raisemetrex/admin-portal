
import React from 'react';

function Missing(props) {
  return (
    <div style={{padding: '10px'}}>
      <h4>Missing Component</h4>
      <p>
        Sorry. The <strong>{props.componentName}</strong> component could not be found in the Component Factory.
      </p>
    </div>
  )
}

export default Missing;
