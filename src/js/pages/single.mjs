import '../../css/app.css'
import loadListing from '../api/single.mjs'
import gallery from '../blocks/gallery.mjs'
import loadContentSide from '../blocks/singleContent.mjs'
import { updateDeadline } from '../functions.mjs'
import addBid from '../api/addBid.mjs'

const urlParams = new URLSearchParams(window.location.search)
let id = null
if (urlParams.has('id')) {
  id = urlParams.get('id')
  load(id)
}

// loading existent listing content for user to update
async function load(id) {
  const listing = await loadListing(id)
  const loader = document.querySelector('.loader')
  loader.remove()

  // get gallery content and add to HTML
  const galleryContent = gallery(listing.media, listing.endsAt)
  const gallerySide = document.querySelector('.gallery-side')
  gallerySide.innerHTML = galleryContent

  // load buttons actions
  changeButtonsAction(listing.media.length)
  updateDeadline()

  // load content side
  const content = loadContentSide(listing)
  const contentSide = document.querySelector('.content-side')
  contentSide.innerHTML = content

  setOnClick()
}

/**
 * change button actions
 */
function changeButtonsAction(total) {
  const prev = document.querySelector('#prev')
  const next = document.querySelector('#next')

  // first image
  let currentIndex = 0

  if (prev != null) {
    // set to always start on first image
    const first = document.querySelector('[data-item="0"]')
    first.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    })
    // go to previous image or last
    prev.onclick = function () {
      if (currentIndex == 0) {
        currentIndex = total - 1
      } else {
        currentIndex -= 1
      }

      const item = document.querySelector(`[data-item="${currentIndex}"]`)
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }

    // go to next image or first
    next.onclick = function () {
      if (currentIndex + 1 == total) {
        currentIndex = 0
      } else {
        currentIndex += 1
      }

      const item = document.querySelector(`[data-item="${currentIndex}"]`)
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      })
    }
  }
}

/**
 * sets onclick events for new bid btns
 */
function setOnClick() {
  const btn = document.querySelector('.bid-btn')

  btn.onclick = async function () {
    const input = document.querySelector(`[data-id="${id}"]`)
    const amount = input.value
    const data = await addBid(id, amount)

    // Check for errors
    if ('errors' in data && data.errors.length) {
      window.alert(data.errors[0].message)
    } else {
      load(id)
      window.alert('Nice! You have the latest bid!')
    }
  }
}
