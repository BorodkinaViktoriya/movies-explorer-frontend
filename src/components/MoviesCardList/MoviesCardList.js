import './MoviesCardList.css';
import React from "react";
import {useLocation} from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard'


function MoviesCardList({movies}) {
  const {pathname} = useLocation();
  return (
    <section className="cards-container">
      <div className="cards-container__list">
        {movies.map((movie) =>
          <MoviesCard
            key={movie.id}
            card={movie}
          />
        )}
      </div>
      {pathname === "/movies" ? <button className="cards-container__more">Еще</button> :
        <div className="cards-container__empty"></div>}
    </section>
  )
}

export default MoviesCardList;
