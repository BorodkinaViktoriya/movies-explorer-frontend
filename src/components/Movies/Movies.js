import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {foundMovieError, notFoundMovie} from "../../utils/constants";
import {useCurrentWidth} from "../../hooks/useCurrentWidth";

function Movies({initialMovies, isDark, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [foundMovies, setFoundMovies] = useState([]);
  const [isCheckboxOn, setIsCheckboxOn] = useState(false);
  const [infoText, setInfoText] = useState('Ничего не найдено');
  const [inputValue, setInputValue] = useState('');

const windowWidth = useCurrentWidth



  useEffect(() => {
    setIsLoading(true)
    const foundBefore = JSON.parse(localStorage.getItem('savedMovies'));
    const foundBeforeInInput = JSON.parse(localStorage.getItem('savedInputValue'));
    const checked = localStorage.getItem('isCheckboxOn');
    if(checked) {
      setIsCheckboxOn(checked)
    }
    setInputValue(foundBeforeInInput)
    if (foundBefore) {
      console.log('foundBefore', foundBefore)
      console.log('foundBefore', foundBeforeInInput)
      setFoundMovies(foundBefore)
      setIsFound(true)
    }
    console.log('foundBefore', foundBefore)
    setIsLoading(false)
  }, []);

  function toggleCheckbox () {
    console.log(' before shorts', isCheckboxOn)
    setIsCheckboxOn(!isCheckboxOn);
  }


  function handleSearchAllMovies(evt) {
    evt.preventDefault();
    setIsLoading(true)
    console.log('all фильмы', initialMovies)
    localStorage.setItem('savedInputValue', JSON.stringify(inputValue));
    localStorage.setItem('isCheckboxOn', isCheckboxOn);
    if (!inputValue) {
      setIsLoading(false);
      return;
    }
    console.log(isCheckboxOn)
    const found = initialMovies.filter(m=>{
      if (isCheckboxOn) {
        return m.duration<= 40 &&m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
      }
       return m.nameRU.toLowerCase().includes(inputValue.toLowerCase())})

    console.log('найденные фильмы', found)
    localStorage.setItem('savedMovies', JSON.stringify(found));
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

  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm
          onSubmit={handleSearchAllMovies}
          inputValue={inputValue}
          setInputValue={setInputValue}
          active={isCheckboxOn}
          toggleCheckbox={toggleCheckbox}
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