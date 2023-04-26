import "./Profile.css";

export default function Profile() {
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Николай!</h1>
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
              defaultValue="Николай"
              required
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
              defaultValue="pochta@yandex.ru"
              required
            />
          </div>
          <button className="profile__edit" type="submit">
            Редактировать
          </button>
        </form>
        <button className="profile__exit" type="button">
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
}
