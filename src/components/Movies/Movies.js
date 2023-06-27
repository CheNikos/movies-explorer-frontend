import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { searchMovies, sortedCardsShortFilms } from "../../utils/utils";
import { MAX_SHORT_MOVIE_DURATION } from "../../utils/constants";

export default function Movies({
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
  cards,
}) {
  const [checkBox, setCheckBox] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentCards, setCurrentCards] = useState({});

  useEffect(() => {
    const queryData = localStorage.getItem("queryData");
    if (queryData) {
      setSearch(JSON.parse(queryData)?.search);
      setCheckBox(JSON.parse(queryData)?.checkBox);
    }
  }, []);

  useEffect(() => {
    const queryData = localStorage.getItem("queryData");
    const searchFilms = JSON.parse(queryData)?.searchFilms || cards;
    checkBox
      ? setCurrentCards(sortedCardsShortFilms(searchFilms))
      : setCurrentCards(searchFilms);
  }, [checkBox, cards]);

  useEffect(() => {
    const queryData = localStorage.getItem("queryData");
    if (queryData) {
      const newQueryData = JSON.parse(queryData);
      newQueryData.checkBox = checkBox;
      localStorage.setItem("queryData", JSON.stringify(newQueryData));
    }
  }, [checkBox]);

  const onSendEligibleFilm = () => {
    try {
      setLoading(true);
      let searchFilms = JSON.parse(localStorage.getItem("allCards"));

      if (search) {
        searchFilms = searchMovies(search.trim(), searchFilms);
      }

      setCurrentCards(
        checkBox ? sortedCardsShortFilms(searchFilms) : searchFilms
      );

      const queryData = {
        searchFilms,
        search,
        checkBox,
      };
      localStorage.setItem("queryData", JSON.stringify(queryData));

      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  const onClickCheckBoxHandler = (value) => {
    const allCards = JSON.parse(localStorage.getItem("allCards"));
    setCheckBox(value);
    if (search) {
      const checkShortFilms = value
        ? sortedCardsShortFilms(allCards)
        : allCards;
      setCurrentCards(searchMovies(search?.trim(), checkShortFilms));
      return;
    }
    if (value) {
      setCurrentCards(
        allCards.filter((card) => card.duration <= MAX_SHORT_MOVIE_DURATION)
      );
    } else {
      setCurrentCards(allCards);
    }
  };

  return (
    <main className="movies">
      <SearchForm
        valueCheckBox={checkBox}
        onClickCheckBox={onClickCheckBoxHandler}
        onClick={onSendEligibleFilm}
        value={search}
        setValue={setSearch}
        loading={loading}
      />
      <MoviesCardList
        cards={currentCards}
        isSavedMovies={false}
        savedMovies={savedMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}
