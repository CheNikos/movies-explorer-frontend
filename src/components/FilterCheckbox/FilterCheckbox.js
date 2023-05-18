import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className="filter">
      <input
        className="filter__checkbox"
        type="checkbox"
      />
      <span className="filter__tumbler"></span>
    </label>
  );
}