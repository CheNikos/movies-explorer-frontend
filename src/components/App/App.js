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
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [listFoundSavedMovies, setListFoundSavedMovies] = useState([]);
  const navigate = useNavigate();

  const [Cards, setCardsList] = useState([]);
  useEffect(() => {
    moviesApi
      .getMovies()
      .then((res) => {
        setCardsList(res);
      })
      .catch((err) => {
        console.log(err);
      });
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

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [setCurrentUser, loggedIn]);

  function handleSingOut() {
    localStorage.removeItem("jwt");
  }

  function handleUpdateProfile({ name, email }) {
    mainApi
      .updateUserInfo(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSaveMovie = (card) => {
    mainApi.saveMovie(card)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        setListFoundSavedMovies([...savedMovies, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteMovie = (saveId, movieId) => {
    mainApi.deleteMovie(saveId)
      .then(() => {
        setSavedMovies(savedMovies.filter(movie => movie.movieId !== movieId));
        setListFoundSavedMovies(listFoundSavedMovies.filter(movie => movie.movieId !== movieId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                cards={Cards}
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
                cards={Cards}
                component={SavedMovies}
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
