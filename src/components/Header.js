import { Link, withRouter, useHistory } from 'react-router-dom';
function Header(props) {
  const history = useHistory();
  function handleExit() {
    props.setLoggedIn(false)
    localStorage.removeItem('jwt');
    localStorage.removeItem('_id');
    localStorage.removeItem('email');
    history.push('/sign-in');
  }
  return (
    <header className="header">
      <a className="header__logo" href="#" target="_blank"></a>
      <div className="header__text-container">
        <p className="header__email">{props.loggedIn ? props.email : ''}</p>
        {props.loggedIn ? <p className="header__text-button header__text-button_type_exit" onClick={handleExit} >Выход</p> : <Link className="header__text-button" to={props.location.pathname === "/sign-up" ? "/sign-in" : "/sign-up"}>{props.location.pathname === "/sign-up" && "Войти"}{props.location.pathname === "/sign-in" && "Регистрация"}</Link>}
      </div>

    </header>
  );
}

export default withRouter(Header);
