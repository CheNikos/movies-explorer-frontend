import './App.css';
// import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main"
// import Movies from "../Movies/Movies.js"
// import SavedMovies from "../SavedMovies/SavedMovies.js"
// import Profile from "../Profile.js"
import Header from "../Header/Header"
import Footer from '../Footer/Footer';
// import Register from "../Register.js"
// import Login from "../Register.js"
// import Footer from "../Footer/Footer"

function App() {

  return (
    <div className='app'>
        <Header />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
