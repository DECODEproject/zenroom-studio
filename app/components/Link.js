import React from 'react';
import { LinkHorizontal } from '@vx/shape';

type Props = {
  data: array,
  stepPercent: number
};

function Link(props: Props, ...innerProps) {
  return (
    <LinkHorizontal
      data={props.data}
      percent={props.stepPercent}
      stroke="#374469"
      strokeWidth="1"
      fill="none"
      {...innerProps}
    />
  );
}

export default Link;
