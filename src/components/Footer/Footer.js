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

export default Footer;