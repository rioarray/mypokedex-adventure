import React, { Fragment } from 'react';

export const IconWithLabelSmall = ({ icon, value }) => (
  <Fragment>
    {icon}{' '}
    <span className="pokemon-habitat-label">
      {value}
    </span>
  </Fragment>
);

export default IconWithLabelSmall;
