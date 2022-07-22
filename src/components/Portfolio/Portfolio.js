import React from "react";
import './Portfolio.css';
import {russianTravelLink, onePageLink, mestoLink} from '../../utils/constants'

function Portfolio(props) {

  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href={onePageLink} target='_blank'>Статичный сайт<span className="portfolio__span">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href={russianTravelLink} target='_blank'>Адаптивный сайт<span className="portfolio__span">↗</span>
          </a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href={mestoLink} target='_blank'>Одностраничное приложение<span className="portfolio__span">↗</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;