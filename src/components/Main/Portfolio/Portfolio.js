import "./Portfolio.css";

export default function Portfolio() {
  return (
    <div className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__website">
            <h3 className="portfolio__text">Статичный сайт</h3>
            <div className="portfolio__cursor">↗</div>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__website">
            <h3 className="portfolio__text">Адаптивный сайт</h3>
            <div className="portfolio__cursor">↗</div>
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__website">
            <h3 className="portfolio__text">Одностраничное приложение</h3>
            <div className="portfolio__cursor">↗</div>
        </div>
    </div>
  );
}