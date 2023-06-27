import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import {
  MOVIE_NUMBER,
  SCREEN_BREAKPOINT,
  MESSAGES,
} from "../../../utils/constants";

export default function MoviesCardList({
  cards,
  savedMovies,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  const [savedMoviesl, setSavedMovies] = useState(0);
  useEffect(() => {
    const moviesSaved = JSON.parse(localStorage.getItem("savedMovies"));
    setSavedMovies(moviesSaved ?? savedMovies);
  }, [savedMovies]);
  const location = useLocation();
  function shownMoviesList() {
    const display = window.innerWidth;
    if (display > SCREEN_BREAKPOINT.LAPTOP) {
      setShownMovies(MOVIE_NUMBER.EXTRA_LARGE.DEFAULT);
    } else if (display > SCREEN_BREAKPOINT.TABLET) {
      setShownMovies(MOVIE_NUMBER.LARGE.DEFAULT);
    } else if (display > SCREEN_BREAKPOINT.SMARTPHONE) {
      setShownMovies(MOVIE_NUMBER.MEDIUM.DEFAULT);
    } else if (display < SCREEN_BREAKPOINT.SMARTPHONE) {
      setShownMovies(MOVIE_NUMBER.SMALL.DEFAULT);
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
    if (display > SCREEN_BREAKPOINT.LAPTOP) {
      setShownMovies(shownMovies + MOVIE_NUMBER.EXTRA_LARGE.ADD);
    } else if (display > SCREEN_BREAKPOINT.TABLET) {
      setShownMovies(shownMovies + MOVIE_NUMBER.LARGE.ADD);
    } else if (display < SCREEN_BREAKPOINT.TABLET) {
      setShownMovies(shownMovies + MOVIE_NUMBER.MEDIUM.ADD);
    }
  }

  function getSavedMovieCard(savedMovies, card) {
    return savedMovies?.find((savedMovie) => savedMovie.movieId === card.id);
  }

  return (
    <>
      {location.pathname === "/saved-movies" ? (
        <>
          <div className="movies-cards">
            {cards &&
              cards?.map((card) => (
                <MoviesCard
                  card={card}
                  cards={cards}
                  key={card.movieId}
                  isSavedMovies={isSavedMovies}
                  saved={getSavedMovieCard(savedMoviesl, card)}
                  onSaveMovie={onSaveMovie}
                  onDeleteMovie={onDeleteMovie}
                  savedMovies={savedMoviesl}
                />
              ))}
            {!cards && <div>MESSAGES.MOVIE_NOT_FOUND</div>}
          </div>
          <div className="movies-cards__more"></div>
        </>
      ) : (
        <>
          <div className="movies-cards">
            {cards?.length ? (
              cards
                ?.slice(0, shownMovies)
                ?.map((card) => (
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
                ))
            ) : (
              <div>{MESSAGES.MOVIE_NOT_FOUND}</div>
            )}
          </div>
          <div className="movies-cards__more">
            {cards?.length > shownMovies ? (
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
