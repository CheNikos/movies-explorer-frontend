import "./SearchForm.css";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox"

export default function SearchForm({value, setValue, onClick, onClickCheckBox, valueCheckBox}) {

  return (
    <div className="search-form">
      <div className="search-form__search">
        <input
          type="text"
          name="name_movies"
          placeholder="Фильм"
          className="search-form__input"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          required
        />
        <button onClick={onClick} className="search-form__find">
        </button>
      </div>
      <div className="search-form__line"></div>
      <div className="search-form__checkbox">
        <div><FilterCheckbox value={valueCheckBox} onClick={(e) => onClickCheckBox(e.currentTarget.checked)} /></div>
        <p className="search-form__filter">Короткометражки</p>
      </div>
    </div>
  );
}
