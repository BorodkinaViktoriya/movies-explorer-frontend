import React from "react";
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

function SearchForm() {
  return (

    <section className="search">
      <form className="search__form">
        <input type="text" placeholder="Фильм" className="search__input" required>
        </input>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox/>
      <div className="search__line"></div>
    </section>
  )
}

export default SearchForm;


