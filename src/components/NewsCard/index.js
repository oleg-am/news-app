import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const { string } = PropTypes;

export const propTypes = {
  title: string.isRequired,
  urlToImage: string.isRequired,
  author: string.isRequired,
  publishedAt: string.isRequired,
};

const NewsCard = ({ title, urlToImage, author, publishedAt }) => (
  <div className="NewsCard">
    <img className="NewsCard__img" alt={title} src={urlToImage} />
    <h2>{title}</h2>
    <div>{author}</div>
    <div>{publishedAt}</div>
  </div>
);

NewsCard.propTypes = propTypes;

export default NewsCard;
