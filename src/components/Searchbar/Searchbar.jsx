import React, { Component } from 'react';
import { Notify } from 'notiflix';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = { searchValue: '' };

  handleChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleSumbmit = e => {
    e.preventDefault();
    if (this.state.searchValue.trim() === '') {
      return Notify.failure('Put something for search');
    }
    this.props.onSubmit(this.state.searchValue);
    this.reset();
  };

  reset = () => {
    this.setState({
      searchValue: '',
    });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSumbmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            value={this.state.searchValue}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
