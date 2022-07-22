import React from "react";
import SectionTitle from '../SectionTitle/SectionTitle'
import './AboutMe.css';
import foto from '../../images/pic__COLOR_pic.jpg';

function AboutMe() {

  return (
    <div className="student">
      <SectionTitle title={"Студент"}/>
      <div className="student__content">
        <div className="student__info">
          <div className="student__about">
            <h3 className="student__name">Виктория</h3>
            <p className="student__job"> Фронтенд-разработчик, 34 года</p>
            <p className="student__brief">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть
              жена
              и&nbsp;дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
              компании
              «СКБ Контур». После того, как прошёл курс по веб&zwj;-&zwj;разработке, начал заниматься фриланс-заказами и
              ушёл с
              постоянной работы.</p>
          </div>
          <ul className="student__links">
            <li className="student__link">Facebook</li>
            <li className="student__link">Github</li>
          </ul>
        </div>
        <img className="student__photo" src={foto}/>
      </div>
    </div>
  )
}

export default AboutMe;