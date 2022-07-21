import React from "react";
import './Portfolio.css';


function Portfolio(props) {

  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__link">Facebook</li>
        <li className="portfolio__link">Github</li>
      </ul>
    </div>
  )}

export default Portfolio;