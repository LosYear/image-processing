import './Arrow.scss';
import React from 'react';

const Arrow = props => (
  <span className={`arrow ${props.expanded ? 'active' : ''}`}>
    <span />
    <span />
  </span>
);

export default Arrow;
