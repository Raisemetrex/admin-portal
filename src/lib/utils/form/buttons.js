
import React from 'react';
import shortid from 'shortid';

function FormButtons(props) {
  console.log('FormButtons:', props);
  const buttons = props.uiSchema['ui:buttons'];
  return (
    <div>
      {
        buttons.map((button, i) => {
          return <button type="button" onClick={()=>button.onClick(button.action)} key={shortid.generate()} style={{marginRight: '5px'}} >{button.label}</button>;
        })
      }
    </div>
  )
}

export default FormButtons;
