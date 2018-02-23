import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const { string, node } = PropTypes;

export const propTypes = {
  className: string,
  children: node,
};

export const defaultProps = {
  className: '',
  children: null,
};

const Block = ({ children, className }) => (
  <div className={`Block ${className}`}>
    {children}
  </div>
);

Block.propTypes = propTypes;
Block.defaultProps = defaultProps;

export default Block;
