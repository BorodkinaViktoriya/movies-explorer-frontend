import React from "react";
import SectionTitle from '../SectionTitle/SectionTitle'
import './AboutMe.css';
import {GithubLink, VkLink} from "../../utils/constants";

function AboutMe() {

  return (
    <section className="student">
      <SectionTitle title={"Студент"}/>
      <div className="student__content">
        <div className="student__info">
          <div className="student__about">
            <h3 className="student__name">Виктория</h3>
            <p className="student__job"> Фронтенд-разработчик, 34 года</p>
            <p className="student__brief">Я живу в Mоскве, получила образование в МГТУ Станкин по специальностям:
              "Инженер по защите экологической среды" и "Экономический менеджмент". Замужем, трое сыновей. Люблю учиться
              и узнавать новое. С рождения детей работаю с частичной занятостью с документами. Со школы было интересно
              программирование, решила развиваться и соаершенствоваться в веб&zwj;-&zwj;разработке, поэтому пошла
              учиться в Яндекс.</p>
          </div>
          <ul className="student__links">
            <li>
              <a className="student__link" href={VkLink} target='_blank'>Facebook</a></li>
            <li>
              <a className="student__link" href={GithubLink} target='_blank'>Github</a>
            </li>
          </ul>
        </div>
        <div className="student__photo"/>
      </div>
    </section>
  )
}

export default AboutMe;