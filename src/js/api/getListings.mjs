import { apiUrl } from '../config.mjs'

/**
 * Get listings from tag 'gamernaut'
 */
export default async function getListings() {
  const response = await fetch(`${apiUrl}/listings?_tag=gamernaut`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
}
