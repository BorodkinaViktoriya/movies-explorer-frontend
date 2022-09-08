import React, {useEffect, useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import {deleteMovie} from "../../utils/MainApi";
import {notFoundMovie} from "../../utils/constants";

function SavedMovies({savedMovies, setSavedMovies, isDark, loggedIn}) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [infoText, setInfoText] = useState('');
  const [isSavedCheckboxOn, setIsSavedCheckboxOn] = useState(false);

  function toggleSavedCheckbox() {
    setIsSavedCheckboxOn(!isSavedCheckboxOn);
  }

  useEffect(() => {
    setIsSearching(true)
    setFilteredMovies(savedMovies)
    setIsSearching(false)
  }, []);

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    if (!inputValue) {
      return;
    }
    const found = savedMovies.filter(m => {
      if (isSavedCheckboxOn) {
        return m.duration <= 40 && m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
      }
      return m.nameRU.toLowerCase().includes(inputValue.toLowerCase())
    })
    setFilteredMovies(found)
    if (found.length === 0) {
      setInfoText(notFoundMovie)
    }
  }

  function handleDeleteMovie(movie) {
    deleteMovie(movie._id).then(() => {
      const newSavedMovies = savedMovies.filter(
        (item) => item._id !== movie._id
      );
      setFilteredMovies(filteredMovies => filteredMovies.filter(m => m._id !== movie._id))
      return setSavedMovies(newSavedMovies);
    })
  }

  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm
          onSubmit={handleSearchSavedMovies}
          inputValue={inputValue}
          setInputValue={setInputValue}
          active={isSavedCheckboxOn}
          toggleCheckbox={toggleSavedCheckbox}/>
        {isSearching && <Preloader/>}
        {filteredMovies.length === 0 && !isSearching && <p className='movies__info'>{infoText}</p>}
        {filteredMovies.length > 0 && !isSearching &&
        <MoviesCardList movies={filteredMovies} savedMovies={savedMovies} onDelete={handleDeleteMovie}
                        onLike={() => console.log('like')}/>}

      </div>
      <Footer/>
    </>
  );
}

export default SavedMovies;