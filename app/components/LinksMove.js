import React from 'react';
import { Group } from '@vx/group';
import { Transition } from 'react-spring';

import Link from './Link';
import { findCollapsedParent } from '../utils/utils';

type Props = {
  links: Array<Ract.Node>,
  linkType: string,
  layout: string,
  orientation: string,
  stepPercent: number
};

function Links(props: Props) {
  return (
    <Group>
      <Transition
        items={props.links}
        keys={d => `${d.source.data.name}_${d.target.data.name}`}
        from={({ source }) => ({
          sx: source.data.x0,
          sy: source.data.y0,
          tx: source.data.x0,
          ty: source.data.y0
        })}
        enter={({ source, target }) => ({
          sx: source.x,
          sy: source.y,
          tx: target.x,
          ty: target.y
        })}
        update={({ source, target }) => ({
          sx: source.x,
          sy: source.y,
          tx: target.x,
          ty: target.y
        })}
        leave={({ source }) => {
          const collapsedParent = findCollapsedParent(source);
          return {
            sx: collapsedParent.data.x0,
            sy: collapsedParent.data.y0,
            tx: collapsedParent.data.x0,
            ty: collapsedParent.data.y0
          };
        }}
      >
        {props.links.map(link => styles => (
          <Link
            data={{
              source: { x: styles.sx, y: styles.sy },
              target: { x: styles.tx, y: styles.ty }
            }}
            linkType={props.linkType}
            layout={props.layout}
            orientation={props.orientation}
            stepPercent={props.stepPercent}
            stroke="#374469"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </Transition>
    </Group>
  );
}

export default Links;
