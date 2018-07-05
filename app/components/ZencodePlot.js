// @flow
import React, { Component } from 'react';
import { ParentSize } from '@vx/responsive';
import Tree from './Tree';

export default class ZencodePlot extends Component<Props> {
  props: Props;

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
                data={this.props.ast}
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