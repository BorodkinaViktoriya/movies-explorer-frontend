import React from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({cards, isDark, loggedIn}) {
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

export default SavedMovies;