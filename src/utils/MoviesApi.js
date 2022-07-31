import {moviesApiURL} from '../utils/constants'

class MoviesApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers
    })
      .then(this._handleResponse)
  }
}

const
  moviesApi = new MoviesApi({
    baseUrl: moviesApiURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default moviesApi;
