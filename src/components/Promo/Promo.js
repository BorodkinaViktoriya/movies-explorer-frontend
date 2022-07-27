import React from 'react';
import './Promo.css';
import promoLogo from '../../images/promo-logo.svg'


function Promo() {

  return (
    <div className="promo">
      <div className="promo__info">
        <div className="promo__text">
        <h1 className="promo__title">Учебный проект студента факультета Веб-&#x2060;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img
          src={promoLogo}
          className="promo__logo" alt="Логотип"
        />
      </div>
      <a href='#about-project' className="promo__link">Узнать больше</a>
    </div>
  )
}

export default Promo;