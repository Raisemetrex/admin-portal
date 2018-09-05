
import React from 'react';

const JsonProps = props => {
  // console.log('JsonProps.props:', props);
  return (
    <div>
      <h4>No Component - Json Props</h4>
      <pre>
      {JSON.stringify(props, true, 3)}
      </pre>
    </div>
  )
}

export default JsonProps;
