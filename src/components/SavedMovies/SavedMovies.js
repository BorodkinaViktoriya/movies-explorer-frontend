import React, {useEffect, useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import {notFoundMovie} from "../../utils/constants";
import {deleteMovie} from "../../utils/MainApi";

function SavedMovies({savedMovies, setSavedMovies, isDark, loggedIn}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [infoText, setInfoText] = useState('Ничего не найдено');
  const [isCheckboxOn, setIsCheckboxOn] = useState(false);

  function toggleCheckbox() {
    setIsCheckboxOn(!isCheckboxOn);
  }

  useEffect(() => {
    setIsLoading(true)
    setFilteredMovies(savedMovies)
    setIsLoading(false)
  }, [savedMovies]);

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    setIsLoading(true)
    if (!inputValue) {
      setIsLoading(false);
      return;
    }
    const found = savedMovies.filter(m => {
      if (isCheckboxOn) {
        return m.duration <= 40 && m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
      }
      return m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
    })
    setFilteredMovies(found)
    if (found.length === 0) {
      return setInfoText(notFoundMovie)
    }
    return setIsLoading(false)
  }
  function handleDeleteMovie(movie) {
    deleteMovie(movie._id).then(({data}) => {
      const newSavedMovies = savedMovies.filter(
        (item) => item._id !== movie._id
      );
      console.log(newSavedMovies)
      return setSavedMovies(newSavedMovies);
      /*localStorage.setItem('savedmovies', newSavedMovies);*/
    });
  }


  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm
          nSubmit={handleSearchSavedMovies}
          inputValue={inputValue}
          setInputValue={setInputValue}
          active={isCheckboxOn}
          toggleCheckbox={toggleCheckbox}/>
        {isLoading && <Preloader/>}
        {filteredMovies.length === 0 && !isLoading && <p className='movies__info'>{infoText}</p>}
        {filteredMovies.length > 0 && !isLoading &&
        <MoviesCardList movies={filteredMovies} savedMovies={savedMovies} onDelete={handleDeleteMovie} onLike={() => console.log('like')}/>}

      </div>
      <Footer/>
    </>
  );
}

export default SavedMovies;