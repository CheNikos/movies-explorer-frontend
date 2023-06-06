import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({ cards, savedMovies, isSavedMovies, onSaveMovie, onDeleteMovie }) {
  const [shownMovies, setShownMovies] = useState(0);

  function shownMoviesList() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(16);
    } else if (display > 1023) {
      setShownMovies(12);
    } else if (display > 767) {
      setShownMovies(8);
    } else if (display < 767) {
      setShownMovies(5);
    }
  }

  useEffect(() => {
    shownMoviesList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener("resize", shownMoviesList);
    }, 500);
  });

  function showMore() {
    const display = window.innerWidth;
    if (display > 1279) {
      setShownMovies(shownMovies + 4);
    } else if (display > 1023) {
      setShownMovies(shownMovies + 3);
    } else if (display < 1023) {
      setShownMovies(shownMovies + 2);
    }
  }

  return (
    <>
      <div className="movies-cards">
        {cards.slice(0, shownMovies).map((cardsItem) => (
          <MoviesCard
            card={cardsItem}
            key={cardsItem.id}
            isSavedMovies={isSavedMovies}
            onSaveMovie={onSaveMovie}
            onDeleteMovie={onDeleteMovie}
            savedMovies={savedMovies}
          />
        ))}
      </div>
      <div className="movies-cards__more">
        {cards.length > shownMovies ? (
          <button className="movies-cards__more-button" onClick={showMore}>
            Ещё
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
