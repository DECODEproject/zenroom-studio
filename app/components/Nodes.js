// @flow

import React, { Fragment } from 'react';
import { Group } from '@vx/group';

import Node from './Node';
import { getTopLeft } from '../utils/utils';

type Props = {
  nodes: Array<Node>,
  layout: string,
  orientation: string
};

function Nodes(props: Props) {

  return (
    <Fragment>
      {props.nodes.map((node) => (
        <Group {...getTopLeft(node, props.layout, props.orientation)} key={node}>
          <Node
            node={node}
            layout={props.layout}
            orientation={props.orientation}
            onClick={() => props.onNodeClick(node)}
          />
        </Group>
      ))}
    </Fragment>
  );
}

export default Nodes;
