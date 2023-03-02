import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'

/**
 * Get user profile
 * @param {string} name
 * @returns
 */
export default async function getUserProfile(name) {
  try {
    const response = await fetch(`${apiUrl}/profiles/${name}?_listings=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      }
    })

    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}
