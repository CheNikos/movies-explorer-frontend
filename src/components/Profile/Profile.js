import { Link } from "react-router-dom";
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import "./Profile.css";

export default function Profile({ handleSingOut }) {
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {`${currentUser.name}`}!</h1>
        <form className="profile__form">
          <div className="profile__input-content">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="30"
              autoComplete="on"
              value={`${currentUser.name}`}
              required
              disabled
            />
          </div>
          <div className="profile__line"></div>
          <div className="profile__input-content">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input"
              type="email"
              autoComplete="on"
              value={`${currentUser.email}`}
              required
              disabled
            />
          </div>
          <button className="profile__edit" type="submit">
            Редактировать
          </button>
        </form>
        <Link to={"/"}><button className="profile__exit" type="button" onClick= {handleSingOut}>
          Выйти из аккаунта
        </button>
        </Link>
      </div>
    </section>
  );
}
