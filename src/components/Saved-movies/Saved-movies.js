import "../Saved-movies/Saved-movies.css";
import "../Movies/Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { searchMovies, sortedCardsShortFilms } from "../../utils/utils";

export default function SavedMovies({ savedMovies, onDeleteMovie }) {
  const [search, setSearch] = useState("");
  const [checkBox, setCheckBox] = useState(false);

  const [currentCards, setCurrentCards] = useState([]);
  useEffect(() => {
    const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
    if (checkBox) {
      setCurrentCards(sortedCardsShortFilms(moviesSaved ?? savedMovies));
    } else {
      setCurrentCards(moviesSaved ?? savedMovies);
    }
    // eslint-disable-next-line
  }, [savedMovies]);

  const onSendEligibleFilm = () => {
    const checkShortFilms = checkBox
      ? sortedCardsShortFilms(savedMovies)
      : savedMovies;
    if (search) {
      setCurrentCards(searchMovies(search?.trim(), checkShortFilms));
    } else {
      setCurrentCards(checkShortFilms);
    }
  };
  const onClickCheckBoxHandler = (value) => {
    setCheckBox(value);
    if (search) {
      const checkShortFilms = value
        ? sortedCardsShortFilms(savedMovies)
        : savedMovies;
      setCurrentCards(searchMovies(search?.trim(), checkShortFilms));
      return;
    }
    if (value) {
      setCurrentCards(sortedCardsShortFilms(savedMovies));
    } else {
      setCurrentCards(savedMovies);
    }
  };
  return (
    <main className="movies saved-movies">
      <SearchForm
        onClickCheckBox={onClickCheckBoxHandler}
        valueCheckBox={checkBox}
        onClick={onSendEligibleFilm}
        value={search}
        setValue={setSearch}
      />
      <MoviesCardList
        cards={currentCards}
        isSavedMovies={true}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}
