import React, {useState} from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'
import {emptyMovieInputError} from "../../utils/constants";

function SearchForm({onSubmit, inputValue, setInputValue, checkbox}) {
  const [inputValueError, setInputValueError] = useState('');

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
    if (!evt.target.value) {
      return setInputValueError(emptyMovieInputError)
    }
    setInputValueError('');
  }

  return (

    <section className="search">
      <form className="search__form" onSubmit={onSubmit} noValidate>
        <label className="search__label">
          <input type="text" placeholder="Фильм" className="search__input" required
                 value={inputValue}
                 onChange={handleChange}>
          </input>
          <span id="search-error" className="search__error">{inputValueError}</span>
        </label>
        <button className="search__button" type="submit" onSubmit={onSubmit}></button>
      </form>
      <FilterCheckbox checkbox={checkbox}/>
      <div className="search__line"></div>
    </section>
  )
}

export default SearchForm;