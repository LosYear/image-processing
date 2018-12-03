import React from 'react';
import Icon from './loader.js.svg';
import './Loader.scss';

export default props => (
  <div>
    {props.withBackdrop && <div className="loader-backdrop" />}
    <div className="loader">
      <Icon />
    </div>
  </div>
);
