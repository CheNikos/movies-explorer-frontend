import "./AboutMe.css";
import photo from "../../../images/aboutme-image/108144224.jpg";

export default function AboutMe() {
  return (
    <div className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__line"></div>
      <div className="about-me__content">
        <div className="about-me__student">
          <h3 className="about-me__name">Николай</h3>
          <p className="about-me__subname">Фронтенд-разработчик, 29 лет</p>
          <p className="about-me__info">
            Я родился в Анапе, но живу и работаю в Краснодаре. Закончил
            юридический факультет МГГУ. У меня есть жена и дочь. Люблю готовить
            и путешествовать. Недавно начал кодить. С 2015 года работаю в
            компании «ХБ Нева». На данный момент прохожу курс веб-разработки от
            Яндекс.Практикума.
          </p>
          <p className="about-me__github">Github https://github.com/CheNikos</p>
        </div>
        <img src={photo} className="about-me__image" alt="Моё фото" />
      </div>
    </div>
  );
}
