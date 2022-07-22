import SectionTitle from "../SectionTitle/SectionTitle";
import React from "react";
import './Footer.css'
import {yandexLink, githubLink, vkLink} from "../../utils/constants";


function Footer(props) {
  return (
    <div className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; 2022</p>


        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__link" href={yandexLink} target='_blank'>Яндекс.Практикум</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href={githubLink} target='_blank'>Github</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href={vkLink} target='_blank'>Facebook</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

<ul className="portfolio__list">
  <li className="portfolio__list-item">
    <a className="portfolio__link">Статичный сайт<span className="portfolio__span">↗</span>
    </a>
  </li>
  <li className="portfolio__list-item">
    <a className="portfolio__link">Адаптивный сайт<span className="portfolio__span">↗</span>
    </a>
  </li>
  <li className="portfolio__list-item">
    <a className="portfolio__link">Одностраничное приложение<span className="portfolio__span">↗</span>
    </a>
  </li>
</ul>

export default Footer;