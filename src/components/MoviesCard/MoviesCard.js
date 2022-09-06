import React, {useEffect, useState} from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";
import {moviesApiURL} from "../../utils/constants";

function MoviesCard({card, savedMovies, onLike, onDelete}) {
  const {pathname} = useLocation();
  const saved = savedMovies.some(m => m.movieId === card.id);

  function handleDelete() {
    onDelete(card)
  }

  function handleSaving() {
    onLike(card)
  }

  useEffect(() => {
  }, [savedMovies.length]);

  return (
    <div className="card">
      <a
        className="card__trailer-link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="card__poster" src={pathname === '/saved-movies' ? `${card.image}` :
          `${moviesApiURL}${card.image.url}`} alt={card.nameRU}/>
      </a>
      <figcaption className="card__info">
        <div className="card__description">
          <h2 className="card__title">{card.nameRU}</h2>
          {pathname === "/saved-movies" ? (
            <button type="button" className="card__button card__button_type_delete" onClick={handleDelete}/>
          ) : (
            <button
              type="button"
              className={saved ? "card__button card__button_active" : "card__button"}
              onClick={handleSaving}
            />
          )}
        </div>
        <p className="card__duration">{card.duration}</p>
      </figcaption>

    </div>
  )
}

export default MoviesCard;