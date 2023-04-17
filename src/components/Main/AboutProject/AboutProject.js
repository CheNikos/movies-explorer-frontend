import "./AboutProject.css";

export default function AboutProject() {
  return (
    <div className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__line"></div>
      <div className="about-project__content">
        <div className="about-project__container">
          <h3 className="about-project__text">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__info">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__container">
          <h3 className="about-project__text">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__info">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__stage">
        <div className="about-project__stage-complete"><p className="about-project__stage-complete-text">1 неделя</p></div>
        <div className="about-project__stage-waiting"><p className="about-project__stage-waiting-text">4 недели</p></div>
      </div>
      <div className="about-project__subtext">
        <div className="about-project__subtext-complete"><p className="about-project__stage-subtext-text">Back-end</p></div>
        <div className="about-project__subtext-waiting"><p className="about-project__stage-subtext-text">Front-end</p></div>
      </div>
    </div>
  );
}
