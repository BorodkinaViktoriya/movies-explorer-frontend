import './PageNotFound.css';
import React from 'react';
import {useHistory} from "react-router-dom";

function PageNotFound(props) {
const history = useHistory();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__text">Страница не найдена</p>
      </div>
      <button onClick={history.goBack} className="not-found__back">Назад</button>
    </section>
  )
}

export default PageNotFound;