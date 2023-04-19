import "./SearchForm.css";

export default function SearchForm() {
  return (
    <div className="search-form">
      <div className="search-form__search">
        <input
          type="text"
          name="name_movies"
          placeholder="Фильм"
          className="search-form__input"
        />
        <div className="search-form__find">
            <p className="search-form__text">Найти</p>
        </div>
      </div>
      <div className="search-form__line"></div>
      <div className="search-form__checkbox">
        <div className="search-form__tumb"></div>
        <p className="search-form__filter"></p>
      </div>
    </div>
  );
}
