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
    })
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
    })
  }

  jwtCheck(jwt) {
    return fetch(`${this._BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      }
    }).then(res => res.json())
      .then(data => data)

  }
}

const authApi = new AuthApi({
  baseUrl: 'https://auth.nomoreparties.co'
});
export default authApi
