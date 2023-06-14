import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import moviesApi from "../../utils/MoviesApi";

export default function Movies({ savedMovies, onSaveMovie, onDeleteMovie }) {
  const [cards, setCardsList] = useState([]);

  useEffect(() => {
    Promise.all([moviesApi.getMovies()])
      .then(([allMovies]) => {
        setCardsList(allMovies);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, [setCardsList]);

  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        cards={cards}
        isSavedMovies={false}
        savedMovies={savedMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}
