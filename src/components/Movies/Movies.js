import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies({
  cards,
  savedMovies,
  onSaveMovie,
  onDeleteMovie,
}) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList
        cards={cards}
        isSavedMovies={false}
        savedMovies={savedMovies}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
      />
    </main>
  );
}
