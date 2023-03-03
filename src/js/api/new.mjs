import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'

/**
 * Create a new listing
 * @param {object} body
 * @returns
 */
export default async function newListing(body) {
  try {
    const response = await fetch(`${apiUrl}/listings`, {
      method: 'POST',
      body: JSON.stringify(body),
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
