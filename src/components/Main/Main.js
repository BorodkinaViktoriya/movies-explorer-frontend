
import {Link, Route} from "react-router-dom";
import React from "react";
import './Main.css';
import Promo from "../Promo/Promo";
import AboutProject from '../AboutProject/AboutProject'
import AboutMe from '../AboutMe/AboutMe'
import Techs from '../Techs/Techs';
import Portfolio from "../Portfolio/Portfolio";

function Main() {

  return (
    <main className="main">
     <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </main>
  )
}

export default Main;