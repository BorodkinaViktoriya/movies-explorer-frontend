import React, {useState} from "react";
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({cards, isDark, loggedIn}) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  function handleSearchSavedMovies(evt) {
    evt.preventDefault();
    setIsLoading(true)
    if (!inputValue) {
      setIsLoading(false);
      return;
    }
  }
  return (
    <>
      <Header isDark={isDark} loggedIn={loggedIn}/>
      <div className="movies">
        <SearchForm
          nSubmit={handleSearchSavedMovies}
          inputValue={inputValue}
          setInputValue={setInputValue}/>
        <MoviesCardList cards={cards}/>
      </div>
      <Footer/>
    </>
  );
}

export default SavedMovies;