class AuthApi {
  constructor({ baseUrl }) {
    this._BASE_URL = baseUrl
  }

  register(email, password) {
    return fetch(`${this._BASE_URL}/signup`, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      }
      )
    }).then(this._checkResponse)
  };

  auth(email, password) {
    return fetch(`${this._BASE_URL}/signin`, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      }
      )
    }).then(this._checkResponse)
  }

  jwtCheck(jwt) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    }).then(this._checkResponse)

  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co'
});
export default authApi
