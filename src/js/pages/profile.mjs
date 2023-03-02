import '../../css/app.css'
import getUserProfile from '../api/getUserProfile.mjs'
import updateAvatar from '../api/updateAvatar.mjs'
import { listingPanelSimplified } from '../blocks/listingPanel.mjs'
import { signOut, getUser, updateDeadline } from '../functions.mjs'

// select user content
const avatar = document.querySelector('#avatar')
const username = document.querySelector('#username')
const email = document.querySelector('#email')

// fill in user content
const urlParams = new URLSearchParams(window.location.search)
let name = null
if (urlParams.has('name')) {
  name = urlParams.get('name')

  // check if profile is not from logged user
  const user = getUser()
  if (user.name !== name) {
    const loggedUserActions = document.querySelector('#logged-user-actions')
    loggedUserActions.remove()
  }

  loadProfile()
}

// loads profile after api fetch
async function loadProfile() {
  const profile = await getUserProfile(name)
  username.innerHTML = `@${profile.name}`
  email.innerHTML = profile.email

  // checks if user has avatar to display on profile
  if (profile.avatar != null && profile.avatar != '') {
    avatar.src = profile.avatar
  }

  // add listings to html
  const addListings = document.querySelector('#listings')
  profile.listings.map(function (listing) {
    addListings.innerHTML += listingPanelSimplified(listing, profile)
  })
}

// Log out
const logout = document.querySelector('#logout')
logout.onclick = signOut

// Change avatar
const changeAvatar = document.querySelector('#change-avatar')
changeAvatar.onclick = async function () {
  const newAvatar = window.prompt('Avatar URL')
  if (newAvatar != null && newAvatar != '') {
    // update on api
    await updateAvatar(newAvatar)
    // change avatar on left side
    avatar.src = newAvatar

    // select and change header avatar
    const headerAvatar = document.querySelector('#header-avatar')
    headerAvatar.src = newAvatar

    // select and change all user listings avatar
    const listingsAvatar = document.querySelectorAll('.listings-avatar')
    listingsAvatar.forEach(function (listingAvatar) {
      listingAvatar.src = newAvatar
    })
  }
}

updateDeadline()
