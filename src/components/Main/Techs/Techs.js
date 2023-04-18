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
                <li className="techs__stack"><p className="techs__stack-text">HTML</p></li>
                <li className="techs__stack"><p className="techs__stack-text">CSS</p></li>
                <li className="techs__stack"><p className="techs__stack-text">JS</p></li>
                <li className="techs__stack"><p className="techs__stack-text">React</p></li>
                <li className="techs__stack"><p className="techs__stack-text">Git</p></li>
                <li className="techs__stack"><p className="techs__stack-text">Express.js</p></li>
                <li className="techs__stack"><p className="techs__stack-text">mongoDB</p></li>
            </ul>
        </div>
    </div>
  );
}
