import React, { Fragment } from 'react';
import Link from './Link';

type Props = {
  links: Array<React.Node>,
  linkType: string,
  layout: string,
  orientation: string,
  stepPercent: number
};

function Links(props: Props) {
  const { links, linkType, layout, orientation, stepPercent } = props;
  return (
    <Fragment>
      {links.map((link, i) => (
        <Link
          data={link}
          linkType={linkType}
          layout={layout}
          orientation={orientation}
          stepPercent={stepPercent}
          stroke="#374469"
          strokeWidth="1"
          fill="none"
          key={i} // eslint-disable-line react/no-array-index-key
        />
      ))}
    </Fragment>
  );
}

export default Links;
