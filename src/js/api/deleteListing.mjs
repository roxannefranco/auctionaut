import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'

/**
 * Delete a listing
 * @param {object} body
 * @returns
 */
export default async function deleteListing(id) {
  try {
    const response = await fetch(`${apiUrl}/listings/${id}`, {
      method: 'DELETE',
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
