import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const { string } = PropTypes;

export const propTypes = {
  title: string.isRequired,
  urlToImage: string,
  author: string,
  publishedAt: string.isRequired,
};

export const defaultProps = {
  urlToImage: '',
  author: '',
};

const NewsCard = ({ title, urlToImage, author, publishedAt }) => (
  <div className="NewsCard">
    {urlToImage && <img className="NewsCard__img" alt={title} src={urlToImage} /> }
    <h2>{title}</h2>
    <div>{author || ''}</div>
    <div>{publishedAt}</div>
  </div>
);

NewsCard.propTypes = propTypes;
NewsCard.defaultProps = defaultProps;

export default NewsCard;
