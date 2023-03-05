import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'

/**
 * Load existing info of a listing for update
 * @param {object} body
 * @returns
 */
export default async function loadListing(id) {
  try {
    const response = await fetch(
      `${apiUrl}/listings/${id}?_seller=true&_bids=true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        }
      }
    )
    const data = await response.json()
    return data
  } catch (e) {
    console.log(e)
  }
}
