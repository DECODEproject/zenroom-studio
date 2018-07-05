import React, { Fragment } from 'react';
import Link from './Link';

type Props = {
  links: Array<Link>,
  linkType: string,
  layout: string,
  orientation: string,
  stepPercent: number
};

function Links(props: Props) {
  return (
    <Fragment>
      {props.links.map((link, i) => (
        <Link
          data={link}
          linkType={props.linkType}
          layout={props.layout}
          orientation={props.orientation}
          stepPercent={props.stepPercent}
          stroke="#374469"
          strokeWidth="1"
          fill="none"
          key={i}
        />
      ))}
    </Fragment>
  );
}

export default Links;
