import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import movieCards from '../../utils/Movies';

function Movies({cards}) {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList cards={cards}/>
    </div>
  );
}

export default Movies;