// @flow
import React, { Fragment } from 'react';

type Props = {
  node: React.Node,
  onClick: () => {}
};

function Node(props: Props) {
  const width = 60;
  const height = 20;
  const {
    node: {
      depth,
      data: { children },
      name
    },
    onClick
  } = props;
  return (
    <Fragment>
      {depth === 0 && <circle r={20} fill="url('#lg')" onClick={onClick} />}
      {depth !== 0 && (
        <rect
          height={height}
          width={width}
          y={-height / 2}
          x={-width / 2}
          fill="#272b4d"
          stroke={children ? '#03c0dc' : '#26deb0'}
          strokeWidth={1}
          strokeDasharray={!children ? '2,2' : '0'}
          strokeOpacity={!children ? 0.6 : 1}
          rx={!children ? 10 : 0}
          onClick={onClick}
        />
      )}
      <text
        dy=".33em"
        fontSize={10}
        fontFamily="Arial"
        textAnchor="middle"
        style={{ pointerEvents: 'none' }}
        fill="white"
      >
        {name}
      </text>
    </Fragment>
  );
}

export default Node;
