import { apiUrl } from '../config.mjs'

/**
 * Login request to api
 * @param {object} body
 * @returns
 */
export default async function postLogin(body) {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}
