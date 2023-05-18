import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../Saved-movies/Saved-movies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import * as MainApi from "../utils/MainApi";

function App() {
  const navigate = useNavigate();

  function handleRegister({ email, password, name }) {
    return MainApi
      .register(email, password, name)
      .then(() => {
        navigate("/signin");
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" handleRegister={handleRegister} element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
