import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import Main from "../Main/Main";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../Saved-movies/Saved-movies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    mainApi.getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
      })
      .catch((err) => {
        setLoggedIn(false);
        if (err.status !== 401) {
          console.log(err);;
        }
      })
  }, []);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getCards()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      mainApi.checkToken(token).then(() => {
        setLoggedIn(true);
        navigate();
      });
    }
    // eslint-disable-next-line
  }, []);

  function handleRegister({ name, email, password }) {
    return mainApi
      .register(name, email, password)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    return mainApi
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.jwt);
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSingOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("data");
  }

  function handleUpdateProfile({ name, email }) {
    mainApi
      .updateUserInfo(name, email)
      .then((newUserData) => {
        setCurrentUser(newUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSaveMovie(card) {
    mainApi
      .saveMovie(card)
      .then((data) => {
        setSavedMovies([data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteMovie(card) {
    mainApi
      .deleteMovie(card._id)
      .then((card) => {
        setSavedMovies(savedMovies.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                onSaveMovie={handleSaveMovie}
                onDeleteMovie={handleDeleteMovie}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                cards={savedMovies}
                component={SavedMovies}
                onSaveMovie={handleSaveMovie}
                savedMovies={savedMovies}
                onDeleteMovie={handleDeleteMovie}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                handleSingOut={handleSingOut}
                component={Profile}
                onSubmit={handleUpdateProfile}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
