import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Block from 'components/Block';
import NewsCard, { propTypes as newsCardPropTypes } from 'components/NewsCard';
import SourceCard from 'components/SourceCard';
import selectors from './selectors';
import * as actions from './actions';
import './style.css';

const { arrayOf, shape, string, func } = PropTypes;

class SecondPage extends Component {
  static propTypes = {
    location: shape({
      state: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired,
        url: string.isRequired,
        description: string.isRequired,
      })).isRequired,
    }).isRequired,
    match: shape({
      params: shape({
        idSource: string.isRequired,
      }).isRequired,
    }).isRequired,
    data: arrayOf(shape({
      ...newsCardPropTypes,
    })).isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
    load: func.isRequired,
  }

  constructor(props) {
    super(props);

    const { location: { state: filteredSources }, history } = props;

    if (!filteredSources) {
      history.push('/');
    }
  }

  componentDidMount() {
    const { match: { params: { idSource } }, load } = this.props;

    load(idSource);
  }

  componentWillReceiveProps(next) {
    const { match: { params: { idSource } } } = this.props;
    const { match: { params: { idSource: nextIdSource } }, load } = next;

    if (idSource !== nextIdSource) {
      load(nextIdSource);
    }
  }

  goToNewsPage = id => () => {
    const { location: { state: filteredSources }, history } = this.props;

    history.push(`/${id}`, filteredSources);
  }

  render() {
    const { location: { state: filteredSources }, data } = this.props;

    return (
      <div>
        <Link to="/">Go back</Link>
        <div className="SecondPage">
          <Block className="SecondPage__Sources">
            {filteredSources.map(({ id, url, name, description }) => (
              <SourceCard
                key={id}
                name={name}
                url={url}
                description={description}
                onClick={this.goToNewsPage(id)}
              />
            ))}
          </Block>
          <Block className="SecondPage__NewsCard">
            {data.map(({ url, title, urlToImage, author, publishedAt }) => (
              <NewsCard
                key={url}
                title={title}
                urlToImage={urlToImage}
                author={author}
                publishedAt={publishedAt}
              />
            ))}
          </Block>
        </div>
      </div>
    );
  }
}

export default connect(selectors, actions)(SecondPage);
