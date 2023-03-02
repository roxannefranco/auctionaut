import { apiUrl } from '../config.mjs'
import { getToken } from '../functions.mjs'
import { getUser } from '../functions.mjs'

/**
 * add a new avatar url on api
 * @param {string} name
 * @returns
 */
export default async function updateAvatar(avatar) {
  try {
    const user = getUser()
    const response = await fetch(`${apiUrl}/profiles/${user.name}/media`, {
      // key:value
      body: JSON.stringify({ avatar: avatar }),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      }
    })
    const data = await response.json()
    // update local storage
    user.avatar = avatar
    localStorage.setItem('user', JSON.stringify(user))

    return data
  } catch (e) {
    console.log(e)
  }
}
