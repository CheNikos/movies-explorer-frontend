import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul
        href="https://chenikos.github.io/how-to-learn/"
        target="blank"
        className="portfolio__website"
      >
        <li className="portfolio__list">
          <h3 className="portfolio__text">Статичный сайт</h3>
          <div className="portfolio__cursor">↗</div>
        </li>
      </ul>
      <div className="portfolio__line"></div>
      <ul
        href="https://chenikos.github.io/russian-travel/"
        target="blank"
        className="portfolio__website"
      >
        <li className="portfolio__list">
          <h3 className="portfolio__text">Адаптивный сайт</h3>
          <div className="portfolio__cursor">↗</div>
        </li>
      </ul>
      <div className="portfolio__line"></div>
      <ul
        href="https://chenikos.github.io/mesto/"
        target="blank"
        className="portfolio__website"
      >
        <li className="portfolio__list">
          <h3 className="portfolio__text">Одностраничное приложение</h3>
          <div className="portfolio__cursor">↗</div>
        </li>
      </ul>
    </div>
  );
}
