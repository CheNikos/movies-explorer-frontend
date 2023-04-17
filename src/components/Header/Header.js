import './Header.css';
import logo from '../../images/header-image/logo.svg'

export default function Header() {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Logo" />
      <div className='header__navigate'>
        <p className='header__registration'>Регистрация</p>
        <div className="header__signin"><p className='header__signin-text'>Войти</p></div>
      </div>
    </header>
  );
}