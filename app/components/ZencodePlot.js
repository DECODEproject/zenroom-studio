// @flow
import React, { Component } from 'react';
import { ParentSize } from '@vx/responsive';
import Tree from './Tree';
import data from './ExampleData';

export default class ZencodePlot extends Component<Props> {
  props: Props;

  state = {
    ast: '{}',
    data: {'name': 'start', 'children': []}
  }

  constructor(props: Props) {
    super();
  }

  parseAstToData(ast, result) {
    let childCount = Object.keys(ast).length - 2;
    if (typeof ast !== 'object')
      return
    let element = {name: ast[1].tag, children: []}
    for (let i=1; i <= childCount; i++) {
      this.parseAstToData(ast[i], element)
    }

    result.children.push(element)
  }

  static getDerivedStateFromProps(props, state) {
    if (props['ast'] === undefined)
      return null

    if (props.ast !== state.ast) {
      return {
        ast: props.ast
      };
    }
  }

  render() {
    return (
      <ParentSize>
        {size =>
          size.ref && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                minHeight: '300px',
                background: '#22282A'
              }}
            >
              <Tree
                data={this.state.ast}
                width={size.width * 0.9}
                height={size.height * 0.9}
              />
            </div>
          )
        }
      </ParentSize>
    ) 
  }
}