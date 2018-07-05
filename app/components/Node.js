// @flow
import React, { Fragment } from 'react';

type Props = {
  node: React.Node,
  onClick: () => {}
};

function Node(props: Props) {
  const width = 40;
  const height = 20;
  return (
    <Fragment>
      {props.node.depth === 0 && (
        <circle r={20} fill="url('#lg')" onClick={props.onClick} />
      )}
      {props.node.depth !== 0 && (
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill="#272b4d"
          stroke={props.node.data.children ? '#03c0dc' : '#26deb0'}
          strokeWidth={1}
          strokeDasharray={!props.node.data.children ? '2,2' : '0'}
          strokeOpacity={!props.node.data.children ? 0.6 : 1}
          rx={!props.node.data.children ? 10 : 0}
          onClick={props.onClick}
        />
      )}
      <text
        dy=".33em"
        fontSize={9}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill={
          props.node.depth === 0 ? '#71248e' : props.node.children ? 'white' : '#26deb0'
        }
      >
        {props.node.data.name}
      </text>
    </Fragment>
  );
}

export default Node;
