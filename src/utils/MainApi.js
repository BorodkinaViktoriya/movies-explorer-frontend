import {BASE_URL} from '../utils/constants';

const handleResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(res);
}

export const register = ({name, password, email}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, password, email})
  })
    .then((res) => handleResponse(res));
};

export const authorize = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
    .then((res) => handleResponse(res));
};

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then((res) => handleResponse(res));
};

export const getUserData = () => {
  return fetch(`${BASE_URL}/users/me `, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
    .then((res) => handleResponse(res));
}

export const editUserInfo = ({name, email}) =>  {
  return fetch(`$${BASE_URL}/users/me `, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    })
  })
    .then((res) => handleResponse(res));
}