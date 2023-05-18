import { Link } from "react-router-dom";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__website">
        <li className="portfolio__list">
          <h3 className="portfolio__text">
            <Link
              to={"https://chenikos.github.io/how-to-learn/"}
              target="blank"
              className="portfolio__link"
            >
              Статичный сайт
            </Link>
          </h3>
          <div className="portfolio__cursor">
            <Link
              to={"https://chenikos.github.io/how-to-learn/"}
              target="blank"
              className="portfolio__link"
            >
              ↗
            </Link>
          </div>
        </li>
        <li className="portfolio__list">
          <h3 className="portfolio__text">
            <Link
              to={"https://chenikos.github.io/russian-travel/"}
              target="blank"
              className="portfolio__link"
            >
              Адаптивный сайт
            </Link>
          </h3>
          <div className="portfolio__cursor">
            <Link
              to={"https://chenikos.github.io/russian-travel/"}
              target="blank"
              className="portfolio__link"
            >
              ↗
            </Link>
          </div>
        </li>
        <li className="portfolio__list">
          <h3 className="portfolio__text">
            <Link
              to={"https://chenikos.github.io/mesto/"}
              target="blank"
              className="portfolio__link"
            >
              Одностраничное приложение
            </Link>
          </h3>
          <div className="portfolio__cursor">
            <Link
              to={"https://chenikos.github.io/mesto/"}
              target="blank"
              className="portfolio__link"
            >
              ↗
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
}
