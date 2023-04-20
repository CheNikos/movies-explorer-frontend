import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies.js";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
