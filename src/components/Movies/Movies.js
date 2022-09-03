import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {emptyMovieInputError, foundMovieError, notFoundMovie} from "../../utils/constants";

function Movies({initialMovies, isDark, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [infoText, setInfoText] = useState('Ничего не найдено');
  const [inputValue, setInputValue] = useState('');


  useEffect(() => {
    setIsLoading(true)
    const foundBefore = JSON.parse(localStorage.getItem('savedMovies'));
    const foundBeforeInput = JSON.parse(localStorage.getItem('savedInputValue'));
    setInputValue(foundBeforeInput)
    if (foundBefore) {
      console.log('foundBefore', foundBefore)
      console.log('foundBefore', foundBeforeInput)
      setFoundMovies(foundBefore)
      setIsFound(true)
    }
    console.log('foundBefore', foundBefore)
    setIsLoading(false)
  }, []);


  function handleSearchAllMovies(evt) {
    evt.preventDefault();
    setIsLoading(true)
    console.log('all фильмы', initialMovies)
    localStorage.setItem('savedMovies', JSON.stringify(''));
    localStorage.setItem('savedInputValue', JSON.stringify(inputValue));
    if(!inputValue){
      setIsLoading(false);
       return;
    }
    const found = initialMovies.filter(({nameRU}) => nameRU.toLowerCase().includes(inputValue.toLowerCase()))
    console.log('найденные фильмы', found)
    localStorage.setItem('savedMovies', JSON.stringify(''));
    localStorage.setItem('savedInputValue', JSON.stringify(inputValue));
    if (found.length === 0) {
      setIsFound(false)
      setInfoText(notFoundMovie)

    } else if (found) {
      setFoundMovies(found)
      setIsFound(true)
    } else {
      setIsFound(false)
      setInfoText(foundMovieError)
    }
    return setIsLoading(false)
  }

  /*function handleFilmsChange(){


  }*/

  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm
          onSubmit={handleSearchAllMovies}
          inputValue={inputValue}
          setInputValue={setInputValue}
          checkbox={isCheckbox}
        />
        {isLoading && <Preloader/>}
        {!isFound && <p className='movies_info'>{infoText}</p>}
        {isFound && !isLoading && <MoviesCardList movies={foundMovies}/>}
      </div>
      <Footer/>
    </>
  );
}

export default Movies;