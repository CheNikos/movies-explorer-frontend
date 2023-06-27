import "./FilterCheckbox.css";

export default function FilterCheckbox({ onClick, value, loading }) {
  return (
    <label className="filter">
      <input
        checked={value}
        onChange={onClick}
        className="filter__checkbox"
        type="checkbox"
        disabled={loading}
      />
      <span className="filter__tumbler"></span>
    </label>
  );
}
