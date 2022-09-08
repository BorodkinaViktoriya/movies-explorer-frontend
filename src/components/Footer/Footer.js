import SectionTitle from "../SectionTitle/SectionTitle";
import React from "react";
import './Footer.css'
import {YandexLink, GithubLink, VkLink} from "../../utils/constants";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__info">
        <p className="footer__copyright">&copy; 2022</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__link" href={YandexLink} target='_blank'>Яндекс.Практикум</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href={GithubLink} target='_blank'>Github</a>
          </li>
          <li className="footer__list-item">
            <a className="footer__link" href={VkLink} target='_blank'>Facebook</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;