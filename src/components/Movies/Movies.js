import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React from "react";

function Movies({cards, isDark, loggedIn}) {
  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm/>
        <MoviesCardList cards={cards}/>
      </div>
      <Footer/>
    </>
  );
}

export default Movies;