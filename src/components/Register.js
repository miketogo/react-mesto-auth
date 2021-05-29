import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.onRegister(this.state.email, this.state.password)
    // здесь авторизуем пользователя
    // далее проверяем токен
    // наконец, перенаправляем пользователя на страницу `/ducks`

  }
  render() {
    return (
      <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form className="register__form" name="register" onSubmit={this.handleSubmit}>
          <input className="register__input" name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required></input>
          <input className="register__input" name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} required></input>
          <button type="submit" className="register__submit-button">Зарегистрироваться</button>
          <Link className="register__auth-text" to='/sign-in'>Уже зарегистрированы? Войти</Link>
        </form>

      </div>
    )
  }
}

export default withRouter(Register);
