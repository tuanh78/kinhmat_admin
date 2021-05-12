import axios from '../libs/axios'

export const userService = {
  login,
  logout
}

function login (username, password) {
  return axios.post('/auth/login', { username: username, password: password })
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function handleResponse (response) {
  const data = response.data
  if (!response.data.ok) {
    if (response.status === 401) {
      // auto logout if 401 response returned from api
      logout()
      location.reload(true)
    }

    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }

  return response.data
}
