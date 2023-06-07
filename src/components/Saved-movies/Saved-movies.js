import "../Saved-movies/Saved-movies.css";
import "../Movies/Movies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

export default function SavedMovies({ cards, savedMovies, onDeleteMovie }) {
  return (
    <main className="movies saved-movies">
      <SearchForm />
      <MoviesCardList
        cards={cards}
        isSavedMovies={true}
        savedMovies={savedMovies}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}
