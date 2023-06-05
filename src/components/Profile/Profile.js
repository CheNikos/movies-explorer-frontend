import { Link } from "react-router-dom";
import { useContext, useState, useCallback, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormValidation } from '../../hooks/useForm';
import "./Profile.css";

export default function Profile({ handleSingOut, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const { values, setValues, handleInputChange, isValid } =
    useFormValidation();

  const checkStatusSubmit = useCallback(() => {
    return (
      !isValid ||
      (values.name === currentUser.name) & (values.email === currentUser.email)
    );
  }, [isValid, values, currentUser]);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [setValues, currentUser]);

  useEffect(() => {
    setIsSubmitDisabled(checkStatusSubmit());
  }, [checkStatusSubmit]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmitDisabled(true);
    onSubmit(values);
    checkStatusSubmit();
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, {`${currentUser.name}`}!</h1>
        <form
          className="profile__form"
          isSubmitDisabled={isSubmitDisabled}
          onSubmit={handleSubmit}
        >
          >
          <div className="profile__input-content">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
        <Link to={"/"}>
          <button
            className="profile__exit"
            type="button"
            onClick={handleSingOut}
          >
            Выйти из аккаунта
          </button>
        </Link>
      </div>
    </section>
  );
}
