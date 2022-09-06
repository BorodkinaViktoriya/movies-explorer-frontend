import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React, {useEffect, useState} from "react";
import Preloader from "../Preloader/Preloader";
import {foundMovieError, moviesApiURL, notFoundMovie} from "../../utils/constants";
import {useCurrentWidth} from "../../hooks/useCurrentWidth";
import {getFirstRenderCount, getRenderStepCount} from '../../utils/getRenderCount'
import {deleteMovie, getSavedMovies, getUserData, saveMovie} from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

function Movies({isDark, loggedIn, savedMovies, setSavedMovies}) {
  const windowWidth = useCurrentWidth();
  const [isSearching, setIsSearching] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [hiddenMovies, setHiddenMovies] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [renderCount, setRenderCount] = useState(getFirstRenderCount(windowWidth));
  const [isCheckboxOn, setIsCheckboxOn] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [initialMovies, setInitialMovies] = useState([]);

  useEffect(() => {
    setIsSearching(true)
    setInitialMovies(JSON.parse(localStorage.getItem('initialMovies')));
    if (initialMovies) {
      const foundBefore = JSON.parse(localStorage.getItem('foundMovies'));
      const foundBeforeInInput = JSON.parse(localStorage.getItem('savedInputValue'));
      const checked = JSON.parse(localStorage.getItem('isCheckboxOn'));
      setIsCheckboxOn(checked)
      setInputValue(foundBeforeInInput)
      if (foundBefore) {
        setIsFound(true)
      }
    }
    setIsSearching(false)
  }, []);

  function toggleCheckbox() {
    setIsCheckboxOn(!isCheckboxOn);
  }

  function handleSearch(data) {
    localStorage.setItem('savedInputValue', JSON.stringify(inputValue));
    localStorage.setItem('isCheckboxOn', JSON.stringify(isCheckboxOn));
    if (!inputValue) {
      setIsSearching(false);
      return;
    }
    console.log(data)
    const found = data.filter(m => {
      if (isCheckboxOn) {
        return m.duration <= 40 && m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
      }
      return m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
    })
    localStorage.setItem('foundMovies', JSON.stringify(found));
    console.log(found)
    if (found.length === 0) {
      setIsFound(false)
      setInfoText(notFoundMovie)
    } else if (found) {
      setRenderCount(getFirstRenderCount(windowWidth))
      setVisibleMovies(found.slice(0, renderCount))
      if (visibleMovies.length < found.length) {
        setHiddenMovies(true)
      } else {
        setHiddenMovies(false)
      }
      setIsSearching(false);
      return setIsFound(true)
    } else {
      setIsFound(false)
      setInfoText(foundMovieError)
    }
  }

  function handleSearchAllMovies(evt) {
    evt.preventDefault();
    setInfoText('lknlbnlkblkb')
    setIsSearching(true)
    console.log(isSearching)
    /*setInitialMovies(JSON.parse(localStorage.getItem('initialMovies')));*/
    if (!JSON.parse(localStorage.getItem('initialMovies'))) {
      console.log(isSearching)
      moviesApi.getInitialMovies().then((allMovies) => {
        localStorage.setItem('initialMovies', JSON.stringify(allMovies));
        console.log(allMovies)
        setInitialMovies(allMovies)
        console.log(initialMovies)
        handleSearch(initialMovies)
      })
    } else {
      handleSearch(initialMovies)
    }
    return setIsSearching(false)
  }

  function handleMoreVisibleMovies() {
    setRenderCount((prevCount) => prevCount + getRenderStepCount(windowWidth))
    return;
  }

  useEffect(() => {
    const foundBefore = JSON.parse(localStorage.getItem('foundMovies'));
    if (foundBefore) {
      const sliceMovies = foundBefore.splice(0, renderCount);
      setVisibleMovies(sliceMovies)
      if (sliceMovies.length < JSON.parse(localStorage.getItem('foundMovies')).length) {
        setHiddenMovies(true)
      } else {
        setHiddenMovies(false)
      }
    }

  }, [renderCount])


  function handleToggleSave(card) {
    const savedMovie = savedMovies.find(
      (m) => m.movieId === card.id
    );
    if (savedMovie) {
      deleteMovie(savedMovie._id).then(() => {
        const newSavedMovies = savedMovies.filter(
          (item) => item._id !== savedMovie._id
        );
        return setSavedMovies(newSavedMovies);
      });
    } else {
      const newMovie = {
        country: card.country || "Не известна",
        director: card.director || "Неизвестен",
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `${moviesApiURL}${card.image.url}`,
        trailerLink: card.trailerLink,
        nameRU: card.nameRU || "Не известно",
        nameEN: card.nameEN || "Undefind",
        thumbnail: `${moviesApiURL}${card.image.formats.thumbnail.url}`,
        movieId: card.id,
      };
      saveMovie(newMovie).then((movie) => {
          return setSavedMovies(state => [...state, movie])
        }
      );
    }
    ;
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
        {isSearching && <Preloader/>}
        <p className='movies__info'>{infoText}</p>
        {isFound && !isSearching &&
        <MoviesCardList movies={visibleMovies} savedMovies={savedMovies} onDelete={() => console.log('delete')}
                        onLike={handleToggleSave}/>}
        {!isSearching && hiddenMovies &&
        <button className="movies__more" onClick={handleMoreVisibleMovies}>Еще</button>}
      </div>
      <Footer/>
    </>
  );
}

export default Movies;