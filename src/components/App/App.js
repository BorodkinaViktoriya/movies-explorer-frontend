import './App.css';
import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import Profile from "../Profile/Profile";
import Login from '../Login/Login';
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Header isDark={true} loggedIn={false}/>
          <Main/>
          <Footer/>
        </Route>
        <Route path="/movies">
          <Header isDark={false} loggedIn={true}/>
          <Footer/>
        </Route>
        <Route path="/saved-movies">
          <Header isDark={false} loggedIn={true}/>
          <Footer/>
        </Route>
        <Route path="/profile">
          <Header isDark={false} loggedIn={true}/>
          <Profile name={'Виталий'} email={'pochta@yandex.ru'}/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
