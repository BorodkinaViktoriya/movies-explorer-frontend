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
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {getToken} from "../../utils/MainApi";
import allCards from '../../utils/Movies'
import savedMovies from '../../utils/saved-movies'


function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({
    _id: "",
    name: "",
    email: ""
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);

 /* function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getToken(jwt)
        .then((res) => {
          if (res) {
            console.log(res)
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => console.log(err));
    }
  }*/

  useEffect(() => {
    const storageMovies = JSON.parse(localStorage.getItem('movies'));
    if (storageMovies) {
      setInitialMovies(JSON.parse(storageMovies));
    } else {

    }
  })

 /* useEffect(() => {
    checkToken()
    /!*!/!*Promise.all([api.getUserData(), api.getInitialCards()]).then(([data, cardList]) => {
      setCurrentUser(data)
      setCards(cardList)*!/
    })*!/*/
  /*    .catch((err) => console.log('Ошибка при звгрузке данных c сервера'))
  }, [])*/

  /* useEffect(() => {
     const storagedMovies = JSON.parse(localStorage.getItem('movies'));
     if (storagedMovies) {
       setInitialMovies(storagedMovies);
     }
     mainApi
       .getUserInfo()
       .then(({ _id, name, email }) => {
         setUserState({ ...userState, _id, name, email, loggedIn: true });
       })
       .catch((err) => {
         setUserState({ ...userState, loggedIn: false });
         console.log(err);
         localStorage.clear();
       })
       .finally(() => setRequest(false));
   }, []);*/

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route exact path="/">
            <Header isDark={true} loggedIn={loggedIn}/>
            <Main/>
            <Footer/>
          </Route>
          <ProtectedRoute
            exact path="/movies"
            component={Movies}
            cards={allCards}
            isDark={false}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            cards={savedMovies}
            isDark={false}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            name={'Виталий'}
            email={'pochta@yandex.ru'}
            isDark={false}
            loggedIn={loggedIn}
          />
          <Route path="/signin">
            <Login setLoggedIn={setLoggedIn}
                   setCurrentUser={setCurrentUser}/>
          </Route>
          <Route path="/signup">
            <Register setLoggedIn={setLoggedIn}
                      setCurrentUser={setCurrentUser}/>
          </Route>
          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
