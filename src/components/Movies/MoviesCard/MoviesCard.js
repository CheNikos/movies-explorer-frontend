import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

export default function MoviesCard({
  card,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  saved,
}) {
  const location = useLocation();
  const cardLike = `movies-card__like ${saved ? "movies-card__like_active" : ""}`;

  function handleSaveMovie() {
    if (saved) {
      onDeleteMovie(savedMovies.filter((m) => m.movieId === card.id)[0]);
    } else {
      onSaveMovie(card);
    }
  }

  function handleDeleteMovie() {
    onDeleteMovie(card);
  }

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
          {isSavedMovies? (
            <button
              type="button"
              className={"movies-card__like-delete"}
              onClick={handleDeleteMovie}
            ></button>
          ) : (
            <button
              type="button"
              className={cardLike}
              onClick={handleSaveMovie}
            ></button>
          )}
        </div>
        <div className="movies-card__line"></div>
        <p className="movies-card__time">{card.duration} минут(ы)</p>
      </li>
    </ul>
  );
}
