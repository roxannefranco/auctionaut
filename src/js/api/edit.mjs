import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'

/**
 * Edit a listing
 * @param {object} body
 * @returns
 */
export default async function editListing(body, id) {
  try {
    const response = await fetch(`${apiUrl}/listings/${id}`, {
      method: 'PUT',
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
