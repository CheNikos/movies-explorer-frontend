import "./MoviesCard.css";

import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function MoviesCard({
  card,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
}) {
  const location = useLocation();

  const [isSaved, setIsSaved] = useState(false);
  const [savedMovie, setSavedMovie] = useState();

  useEffect(() => {
    setSavedMovie(savedMovies.find(m => m.id === card.id));
    if (!!savedMovie) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [card, savedMovie, savedMovies]);

  const handleSaveMovie = () => {
    onSaveMovie(card);
    console.log(card.id);
  };

  const handleDeleteMovie = () => {
    onDeleteMovie(savedMovie.saveId, savedMovie.id);
  };

  return (
    <ul className="movies-card">
      <li className="movies-card__list">
        <img
          src={`https://api.nomoreparties.co/${card.image.url}`}
          alt={card.nameRU}
          className="movies-card__image"
        />
        <div className="movies-card__description">
          <p className="movies-card__name">{card.nameRU}</p>
          {location.pathname === "/movies" && (
            <button
              className={`movies-card__like ${
                !isSavedMovies
                  ? !isSaved
                    : "movies-card__like_active"
              }`}
              onClick={!isSaved ? handleSaveMovie : handleDeleteMovie}
            ></button>
          )}
          {location.pathname === "/saved-movies" && (
            <button
              className="movies-card__like-delete"
              onClick={!isSaved ? handleSaveMovie : handleDeleteMovie}
            ></button>
          )}
        </div>
        <div className="movies-card__line"></div>
        <p className="movies-card__time">{card.duration} минут(ы)</p>
      </li>
    </ul>
  );
}
