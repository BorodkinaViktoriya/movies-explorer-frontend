import React from "react";
import './Portfolio.css';
import {RussianTravelLink, OnePageLink, MestoLink} from '../../utils/constants'

function Portfolio(props) {

  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href={OnePageLink} target='_blank'>Статичный сайт<span className="portfolio__span">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href={RussianTravelLink} target='_blank'>Адаптивный сайт<span className="portfolio__span">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href={MestoLink} target='_blank'>Одностраничное приложение<span className="portfolio__span">↗</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;