import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'

/**
 * add a new bid on api
 * @param {string} id
 * @param {number} amount
 * @returns
 */
export default async function addBid(id, amount) {
  try {
    const response = await fetch(`${apiUrl}/listings/${id}/bids`, {
      // key:value
      body: JSON.stringify({ amount: parseInt(amount) }),
      method: 'POST',
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
