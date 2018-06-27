// @flow

import React, { Fragment } from 'react'
import { Group } from '@vx/group'

import Node from './Node'
import { getTopLeft } from '../utils/utils'


function Nodes({ nodes, layout, orientation, onNodeClick }) {
  props: Props;
  
  return (
    <Fragment>
      {nodes.map((node, i) => (
        <Group {...getTopLeft(node, layout, orientation)} key={node}>
          <Node
            node={node}
            layout={layout}
            orientation={orientation}
            onClick={() => onNodeClick(node)}
          />
        </Group>
      ))}
    </Fragment>
  )
}

export default Nodes