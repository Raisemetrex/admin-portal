
import React from 'react';
import ReactDOM from 'react-dom';

import ReactFinder from 'react-finderjs';

import objectToTree from '../utils/objectToTree';

import SQLEditor from './sqlEditor';

const data = [
  {
    id: 1,
    label: 'Label A',
    children: [
      {
        id: 10,
        label: 'Label A1',
      },
      {
        id: 11,
        label: 'Label A2',
      }
    ],
  },
  {
    id: 2,
    label: 'Label B',
    children: [],
  },
];

function process(data) {
  const objectTree = objectToTree(data);
  console.log('process:', {
    data,
    objectTree,
  });
  return objectTree;
}

class Finder extends React.Component {
  constructor(props) {
    super(props);
    this.reactFinder = null;
  }

  eventHandler = (type, item, dom) => {
    console.log(`eventHandler[${type}]:`, {
      item,
      dom,
    });
  }

  createSimpleColumn = (item) => {
    const div = document.createElement('div');
    const component = (
        <div style={{padding: '5px'}}>
          <div>{item.path}</div>
          <div>{item.id === 'sql' ? <SQLEditor sql={item.value} /> : JSON.stringify(item.value)}</div>
        </div>
    );

    return ReactDOM.render(component,div);
  }

  leafSelected = (item, dom)  => {
    const { reactFinder } = this;
    console.log('leafSelected:', { item, dom, reactFinder });
    this.reactFinder._finder.emit('create-column', this.createSimpleColumn(item));
   // emitter.emit('create-column', createSimpleColumn(item));
  }

  render() {
    const { props } = this;
    console.log('Finder.props:', props);

    const objectTree = process(props.data);
    // for(let i = 0;i < 40; i += 1) {
    //   data[1].children.push({
    //     id: `2.${i+1}`,
    //     label: `Child ${i+1<10 ? `0${i+1}` : i+1}`,
    //   });
    // }
    return (
      <ReactFinder
        ref={r => this.reactFinder = r}
        className = ""
        data = {objectTree}
        _onItemSelected={(i,d) => { this.eventHandler('ItemSelected', i, d)}}
        onLeafSelected={this.leafSelected}
        _onColumnCreated={(i,d) => { this.eventHandler('ColumnCreated', i, d)}}
      />
    )
  }
}

export default Finder;
