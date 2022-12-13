import { useState } from 'react';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const handleSumbmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      return Notify.failure('Put something for search');
    }
    onSubmit(searchValue);
    reset();
  };

  const reset = () => {
    setSearchValue('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSumbmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          value={searchValue}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTupes = {
  onSubmit: PropTypes.func.isRequired,
};
