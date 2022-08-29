import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, {useState} from "react";
import Preloader from "../Preloader/Preloader";

function Movies({initialMovies, isDark, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [infoText, setInfoText] = useState('Ничего не найдено');

  function handleSearch(evt) {
    evt.preventDefault();

  }


  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm
          handleSearch={handleSearch}/>
        {isLoading && <Preloader/>}
        {!isFound && <p className='movies_info'>{infoText}</p>}
        {isFound && <MoviesCardList movies={initialMovies}/>}
      </div>
      <Footer/>
    </>
  );
}

export default Movies;