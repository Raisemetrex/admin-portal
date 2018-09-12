
import React from 'react';

function Missing(props) {
  return (
    <div>
      <h4>Missing Component</h4>
      <p>
        Sorry. The {props.componentName} could not be found in the Component Factory.
      </p>
    </div>
  )
}

export default Missing;
