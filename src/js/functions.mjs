import { findTime } from './blocks/listingPanel.mjs'

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

/**
 * Get user's avatar if one was provided
 */
export function getAvatar() {
  const user = getUser()
  if (user.avatar != null && user.avatar != '') {
    return user.avatar
  } else {
    return '/img/noavatar.jpg'
  }
}

/**
 * Removes token and signs out the user
 */
export function signOut() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  // after removing token user is redirected to login
  window.location.replace('/index.html')
}

/**
 * updates deadline every second
 */
export function updateDeadline() {
  // runs every second
  setInterval(function () {
    // find all deadline elements
    const deadlines = document.querySelectorAll('.deadline')
    deadlines.forEach(function (deadline) {
      const endsAt = deadline.dataset.end
      const time = findTime(endsAt)
      // update days
      const days = deadline.querySelector('.days')
      days.innerHTML = time.days

      // update hours
      const hours = deadline.querySelector('.hours')
      hours.innerHTML = time.hours

      // update minutes
      const minutes = deadline.querySelector('.minutes')
      minutes.innerHTML = time.minutes

      // update seconds
      const seconds = deadline.querySelector('.seconds')
      seconds.innerHTML = time.seconds
    })
  }, 1000)
}
