import { apiUrl } from '../config.mjs'

/**
 * Get listings from tag 'gamernaut'
 * @param {1,2,3,4} filter
 * @returns
 */
export default async function getListings(filter) {
  try {
    let filterUrl = ''
    if (filter == 1) {
      // 1 = ending soon
      filterUrl = '&_active=true&sort=endsAt&sortOrder=asc'
    } else if (filter == 2) {
      // 2 = newly listed
      filterUrl = '&_active=true&sort=created&sortOrder=desc'
    } else {
      filterUrl = '&_active=true'
    }

    const response = await fetch(
      `${apiUrl}/listings?_tag=gamernaut&_seller=true&_bids=true${filterUrl}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    let data = await response.json()

    if (!('errors' in data)) {
      if (filter == 3) {
        // sorts by fewest bids first
        data = data.sort(function (a, b) {
          if (a._count.bids > b._count.bids) {
            return 1
          }

          if (a._count.bids < b._count.bids) {
            return -1
          }

          return 0
        })
      } else if (filter == 4) {
        // sorts by most bids first
        data = data.sort(function (a, b) {
          if (a._count.bids < b._count.bids) {
            return 1
          }

          if (a._count.bids > b._count.bids) {
            return -1
          }

          return 0
        })
      }
    }

    return data
  } catch (e) {
    console.log(e)
  }
}
