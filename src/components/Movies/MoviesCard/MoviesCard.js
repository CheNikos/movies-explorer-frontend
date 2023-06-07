import "./MoviesCard.css";

export default function MoviesCard({
  card,
  isSavedMovies,
  onSaveMovie,
  onDeleteMovie,
  savedMovies,
  saved,
}) {
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
        <img
          src={`https://api.nomoreparties.co/${card.image.url}`}
          alt={card.nameRU}
          className="movies-card__image"
        />
        <div className="movies-card__description">
          <p className="movies-card__name">{card.nameRU}</p>
          {isSavedMovies ? (
            <button
              type="button"
              className="movies-card__like-delete"
              onClick={handleDeleteMovie}
            ></button>
          ) : (
            <button
              type="button"
              className={`${
                saved
                  ? "movies-card__like movies-card__like_active"
                  : "movies-card__like"
              }`}
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
