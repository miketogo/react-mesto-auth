import React from 'react';
import { withRouter } from 'react-router-dom';
import authApi from '../utils/authApi';



function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  let regEmail = localStorage.getItem('regEmail');

  React.useEffect(() => {
    if (regEmail) {

      setEmail(regEmail)

    }
  }, [regEmail])

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }


  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    console.log(email, password)
    authApi.auth(email, password)
      .then((response => response.json()))
      .then((data) => {
        console.log(data.token)
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          props.handleLogin();
          localStorage.removeItem('regEmail');
          return data;
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <input className="login__input" name="email" type="email" placeholder="Email" value={email} onChange={handleEmailChange} required></input>
        <input className="login__input" name="password" type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} required></input>
        <button type="submit" className="login__submit-button">Войти</button>
      </form>
    </div>
  )
}

export default withRouter(Login);
