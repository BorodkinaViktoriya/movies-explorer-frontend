import React from "react";
import './AboutProject.css';
import SectionTitle from "../SectionTitle/SectionTitle";

function AboutProject(props) {

  return (
    <div className="project">
      <SectionTitle title={"О проекте"}/>
      <ul className="project__table">
        <li className="project__column">
          <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
            финальные доработки.</p>
        </li>
        <li className="project__column">
          <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.</p>
        </li>
      </ul>

      <div className="project__chart">

        <div  className="project__chart-container">
          <div className="project__chart-column project__chart-column_type_left">
            <p className="project__chart-text">1 неделя</p>
          </div>
          <p className="project__chart-subtitle">Back-end</p>
        </div>


        <div className="project__chart-container">
          <div className="project__chart-column project__chart-column_type_right">
            <p className="project__chart-text">4 недели</p>
          </div>
          <p className="project__chart-subtitle">Front-end</p>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;