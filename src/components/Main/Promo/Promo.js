import './Promo.css';
import promoImage from '../../../images/promo-image/text__COLOR_landing-logo.svg'

export default function Promo() {

  return (
    <div className="promo">
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <img src={promoImage} className='promo__image' alt='Промо'/>
    </div>
  );
}