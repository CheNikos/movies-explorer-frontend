import "./FilterCheckbox.css";

export default function FilterCheckbox({ onClick, value }) {
  return (
    <label className="filter">
      <input
        value={value}
        onClick={onClick}
        className="filter__checkbox"
        type="checkbox"
      />
      <span className="filter__tumbler"></span>
    </label>
  );
}
