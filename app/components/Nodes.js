// @flow

import React, { Fragment } from 'react';
import { Group } from '@vx/group';

import Node from './Node';
import { getTopLeft } from '../utils/utils';

type Props = {
  nodes: Array<Node>,
  layout: string,
  orientation: string,
  onNodeClick: () => mixed
};

function Nodes(props: Props) {
  const { nodes, layout, orientation, onNodeClick } = props;

  return (
    <Fragment>
      {nodes.map(node => (
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
  );
}

export default Nodes;
