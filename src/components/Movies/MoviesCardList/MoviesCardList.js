import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({
  cards,
  savedMovies,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  const location = useLocation();

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

  function getSavedMovieCard(savedMovies, card) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
  }

  return (
    <>
      {location.pathname === "/saved-movies" ? (
        <>
          <div className="movies-cards">
            {cards.map((card) => (
              <MoviesCard
                card={card}
                cards={cards}
                key={card.movieId}
                isSavedMovies={isSavedMovies}
                saved={getSavedMovieCard(savedMovies, card)}
                onSaveMovie={onSaveMovie}
                onDeleteMovie={onDeleteMovie}
                savedMovies={savedMovies}
              />
            ))}
          </div>
          <div className="movies-cards__more">
          </div>
        </>
      ) : (
        <>
          <div className="movies-cards">
            {cards.slice(0, shownMovies).map((card) => (
              <MoviesCard
                card={card}
                cards={cards}
                key={card.id}
                isSavedMovies={isSavedMovies}
                saved={getSavedMovieCard(savedMovies, card)}
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
      )}
    </>
  );
}
