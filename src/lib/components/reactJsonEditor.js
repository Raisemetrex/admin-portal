
import React from 'react';
import JSONEditor from 'jsoneditor';

class ReactJsoneditor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const editorValues = this.editor.get();
    if (
      JSON.stringify(this.props.values) !== JSON.stringify(nextProps.values) &&
      JSON.stringify(editorValues) !== JSON.stringify(nextProps.values)
    ) {
      this.editor.set(nextProps.values)
      this.editor.expandAll()
    }
  }

  componentDidMount() {
    this.options = {
      // mode: 'form',
      onChangeJSON: (json) => {
        console.log('json:', json);
        if (this.props.onChange) {
          const newValues = this.editor.get()
          this.props.onChange(newValues)
        }
      },
      // onEditable: (node) => {
      //   console.log('onEditable: node:', node);
      //   if (node.field === 'sql') return false;
      //   return true;
      // },
    }
    this.editor = new JSONEditor(this.container, this.options)
    this.editor.set(this.props.values)
    // this.editor.expandAll()
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
        <div className="react-json-editor-wrapper" ref={(el) => {this.container = el}} style={{ height: '800px'}}/>
      </div>
    )
  }
}

export default ReactJsoneditor;
