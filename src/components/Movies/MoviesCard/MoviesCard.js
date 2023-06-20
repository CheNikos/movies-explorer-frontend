import { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import deleteImage from "../../../images/card-image/d1.svg";
export default function MoviesCard({
  card,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  saved,
}) {
  const [isLike, setIsLike] = useState(false);
  const location = useLocation();
  const cardLike = `movies-card__like ${
    isLike ? "movies-card__like_active" : " "
  }`;

  function handleSaveMovie() {
    if (isLike) {
      onDeleteMovie(savedMovies?.filter((m) => m.movieId === card.id)[0]);
      setIsLike(false);
    } else {
      onSaveMovie(card);
    }
  }

  function handleDeleteMovie() {
    onDeleteMovie(card);
  }

  useEffect(() => {
    if (saved) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [saved]);

  const durationMovie = `${Math.trunc(card.duration / 60)}ч ${
    card.duration % 60
  }м`;

  return (
    <ul className="movies-card">
      <li className="movies-card__list">
        {location.pathname === "/movies" ? (
          <img
            src={`https://api.nomoreparties.co/${card.image.url}`}
            alt={card.nameRU}
            className="movies-card__image"
          />
        ) : (
          <img
            src={card.image}
            alt={card.nameRU}
            className="movies-card__image"
          />
        )}
        <div className="movies-card__description">
          <p className="movies-card__name">{card.nameRU}</p>
          {isSavedMovies ? (
            <img
              className="movies-card__like-delete"
              onClick={handleDeleteMovie}
              src={deleteImage}
              alt="удалить фильм"
            />
          ) : (
            <button
              type="button"
              className={cardLike}
              onClick={handleSaveMovie}
            ></button>
          )}
        </div>
        <div className="movies-card__line"></div>
        <p className="movies-card__time">{durationMovie} минут(ы)</p>
      </li>
    </ul>
  );
}
