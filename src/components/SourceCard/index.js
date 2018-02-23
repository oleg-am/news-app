import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const { string, func, node } = PropTypes;

const propTypes = {
  name: string.isRequired,
  url: string,
  description: string.isRequired,
  link: node,
  onClick: func,
};

export const defaultProps = {
  url: '',
  link: null,
  onClick: null,
};

const SourceCard = ({ name, url, description, link, onClick }) => (
  <div role="button" onClick={onClick} className="SourceCard">
    <div className="NewsCard__no-hover">{name}</div>
    <div className="NewsCard__hover">
      <div><a href={url} target="_blank">{url}</a></div>
      <div>{description}</div>
      {link}
    </div>
  </div>
);

SourceCard.propTypes = propTypes;
SourceCard.defaultProps = defaultProps;

export default SourceCard;
