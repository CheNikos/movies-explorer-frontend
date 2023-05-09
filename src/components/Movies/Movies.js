import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

export default function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <div className="movies__more">
        <button className="movies__more-button">Ещё</button>
      </div>
    </main>
  );
}
