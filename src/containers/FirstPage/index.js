import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Block from 'components/Block';
import Pagination from 'components/Pagination';
import { LimitSelect } from 'components/Select';
import FilterSelect from 'components/FilterSelect';
import SourceCard from 'components/SourceCard';
import selectors from './selectors';
import * as actions from './actions';
import { CATEGORIES, COUNTRIES, LANGUAGES } from './data';
import './style.css';

const { arrayOf, shape, string, number, func } = PropTypes;

const dataPropTypes = arrayOf(shape({
  id: string.isRequired,
  name: string.isRequired,
  url: string.isRequired,
  description: string.isRequired,
}));

const FILTERS = {
  category: CATEGORIES,
  country: COUNTRIES,
  language: LANGUAGES,
};

class FirstPage extends Component {
  static propTypes = {
    filters: shape({
      category: arrayOf(string).isRequired,
      country: arrayOf(string).isRequired,
      language: arrayOf(string).isRequired,
    }).isRequired,
    pagination: shape({
      page: number.isRequired,
    }).isRequired,
    data: dataPropTypes.isRequired,
    dataWithPagination: dataPropTypes.isRequired,
    load: func.isRequired,
    changeFilters: func.isRequired,
    changePaginagion: func.isRequired,
    resetAllFilters: func.isRequired,
  }

  componentDidMount() {
    const { load } = this.props;

    load();
  }

  reload = () => {
    const { load } = this.props;

    load();
  }

  addFilters = key => (e) => {
    const { filters, changeFilters } = this.props;

    changeFilters(key, [...filters[key], e.target.value]);
  }

  removeFilters = key => value => () => {
    const { filters, changeFilters } = this.props;

    const newFilters = filters[key].filter(item => item !== value);

    changeFilters(key, newFilters);
  }

  resetAllFilters = () => {
    this.props.resetAllFilters();
  }

  changePaginagion = key => (e) => {
    const { changePaginagion } = this.props;

    changePaginagion(key, e.target ? +e.target.value : e);
  }

  render() {
    const {
      data,
      dataWithPagination,
      filters,
      pagination: { limit, page, pageCount },
    } = this.props;

    return (
      <div className="FirstPage">
        <Block className="FirstPage__Filter">
          <div className="FirstPage__Filter__actions">
            <button onClick={this.reload}>Refresh</button>
            <button onClick={this.resetAllFilters}> Reset all filters </button>
          </div>

          <div>
            {Object.keys(FILTERS).map(key => (
              <FilterSelect
                key={key}
                placeholder={`Select ${key}`}
                options={FILTERS[key]}
                addFilters={this.addFilters(key)}
                removeFilters={this.removeFilters(key)}
                selectedValues={filters[key]}
              />
            ))}
          </div>
        </Block>
        <Block className="FirstPage__NewsCards">
          <div className="FirstPage__NewsCards__list">
            {dataWithPagination.map(({ id, name, url, description }) => (
              <SourceCard
                key={id}
                id={id}
                name={name}
                url={url}
                description={description}
                link={
                  <Link to={{ pathname: `/${id}`, state: data }} >Show news</Link>
                }
              />
            ))}
          </div>
          <div className="FirstPage__pagination">
            <LimitSelect value={limit} onChange={this.changePaginagion('limit')} />
            <Pagination
              pageCount={pageCount}
              value={page}
              onChange={this.changePaginagion('page')}
            />
          </div>
        </Block>
      </div>
    );
  }
}

export default connect(selectors, actions)(FirstPage);
