import "./Techs.css";

export default function Promo() {
  return (
    <div className="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__line"></div>
        <h3 className="techs__technology">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__content">
            <ul className="techs__conteiner">
                <li className="techs__stack"></li>
                <li className="techs__stack"></li>
                <li className="techs__stack"></li>
                <li className="techs__stack"></li>
                <li className="techs__stack"></li>
                <li className="techs__stack"></li>
                <li className="techs__stack"></li>
            </ul>
        </div>
    </div>
  );
}
