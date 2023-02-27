/**
 * Checks if User is logged in
 */
export function checkAuth() {
  const token = localStorage.getItem('accessToken')
  if (token != null) {
    // if if token is stored then user is authenticated
    window.location.replace('/index.html')
  }
}

/**
 * Cheks if user is not logged in
 */
export function checkNotAuth() {
  const token = localStorage.getItem('accessToken')
  if (token == null) {
    // if there is no token stored then user is not authenticated
    window.location.replace('/login.html')
  }
}

/**
 * Get token
 * @returns {string} token - prefixed access token to authorize users
 */
export function getToken() {
  const token = localStorage.getItem('accessToken')
  return `Bearer ${token}`
}

/**
 * Get user
 * @returns {object} user
 */
export function getUser() {
  const user = localStorage.getItem('user')
  // parses user string to object
  return JSON.parse(user)
}
