import { apiUrl } from '../config.mjs'

/**
 * Get listings from tag 'gamernaut'
 */
export default async function getListings() {
  try {
    const response = await fetch(`${apiUrl}/listings?_tag=gamernaut`, {
      method: 'GET',
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
