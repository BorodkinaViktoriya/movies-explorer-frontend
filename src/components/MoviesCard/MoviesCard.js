import React from "react";
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

function MoviesCard({card}) {
  const {pathname} = useLocation();
  const [saved, setSaved] = React.useState(false);

  function handleSaving() {
    setSaved(!saved);
  }
  return (
    <div className="card">
      <img className="card__poster" src={card.url} alt={card.nameRU}/>
      <figcaption className="card__info">
        <div className="card__description">
          <h2 className="card__title">{card.nameRU}</h2>
          {pathname === "/saved-movies" ? (
            <button type="button" className="card__button card__button_type_delete"/>
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