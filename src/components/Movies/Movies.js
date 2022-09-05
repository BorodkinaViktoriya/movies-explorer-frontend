import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {foundMovieError, notFoundMovie} from "../../utils/constants";
import {useCurrentWidth} from "../../hooks/useCurrentWidth";
import {getFirstRenderCount, getRenderStepCount} from '../../utils/getRenderCount'

function Movies({initialMovies, isDark, loggedIn}) {
  const windowWidth = useCurrentWidth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFound, setIsFound] = useState(false);
  /*const [foundMovies, setFoundMovies] = useState([]);*/
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [renderCount, setRenderCount] = useState(getFirstRenderCount(windowWidth));
  const [isCheckboxOn, setIsCheckboxOn] = useState(false);
  const [infoText, setInfoText] = useState('Ничего не найдено');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setIsLoading(true)
    const foundBefore = JSON.parse(localStorage.getItem('savedMovies'));
    const foundBeforeInInput = JSON.parse(localStorage.getItem('savedInputValue'));
    const checked = JSON.parse(localStorage.getItem('isCheckboxOn'));
    setIsCheckboxOn(checked)
    setInputValue(foundBeforeInInput)
    if (foundBefore) {
      setVisibleMovies(foundBefore)
       setIsFound(true)
    }
    setIsLoading(false)
  }, []);

  function toggleCheckbox() {
    setIsCheckboxOn(!isCheckboxOn);
  }


  function handleSearchAllMovies(evt) {
    evt.preventDefault();
    setIsLoading(true)
    localStorage.setItem('savedInputValue', JSON.stringify(inputValue));
    localStorage.setItem('isCheckboxOn', JSON.stringify(isCheckboxOn));
    if (!inputValue) {
      setIsLoading(false);
      return;
    }
    const found = initialMovies.filter(m => {
      if (isCheckboxOn) {
        return m.duration <= 40 && m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
      }
      return m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
    })
    localStorage.setItem('savedMovies', JSON.stringify(found));
    if (found.length === 0) {
      setIsFound(false)
      setInfoText(notFoundMovie)
    } else if (found) {
      setRenderCount(getFirstRenderCount(windowWidth))
      setVisibleMovies(found.slice(0, renderCount))
      setIsLoading(false);
      return setIsFound(true)

    } else {
      setIsFound(false)
      setInfoText(foundMovieError)
    }
    return setIsLoading(false)
  }

  function handleMoreVisibleMovies() {
    setRenderCount((prevCount) => prevCount + getRenderStepCount(windowWidth))
    return;
  }

  useEffect(() => {
    const sliceMovies = JSON.parse(localStorage.getItem('savedMovies')).splice(0, renderCount);
    setVisibleMovies(sliceMovies)
  }, [renderCount])

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
        {!isFound && <p className='movies__info'>{infoText}</p>}
        {isFound && !isLoading && <MoviesCardList movies={visibleMovies}/>}
        {<button className="movies__more" onClick={handleMoreVisibleMovies}>Еще</button>}
      </div>
      <Footer/>
    </>
  );
}

export default Movies;