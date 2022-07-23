import './PageNotFound.css';
import React from 'react';


function PageNotFound(props) {

  return (
    <section className="not-found">
      <div className="not-found__container">
      <h2 className="not-found__title">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      </div>
      <button className="not-found__back">Назад</button>

    </section>
  )
}

export default PageNotFound;