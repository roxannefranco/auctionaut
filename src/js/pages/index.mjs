import '../../css/app.css'
import getListings from '../api/getListings.mjs'
import addBid from '../api/addBid.mjs'
import listingPanel from '../blocks/listingPanel.mjs'

const filterContainer = document.querySelector('#filter')
filterContainer.onchange = function (event) {
  loadAndInsertListings(event.target.value)
}

/**
 * Loads listings and loops through each
 */
async function loadAndInsertListings(filter) {
  // Get listings from API
  const listings = await getListings(filter)

  // insert listings into HTML
  const listingsContainer = document.querySelector('#listings-container')

  listingsContainer.innerHTML = ''

  listings.map(function (listing) {
    // Add everything to html
    listingsContainer.innerHTML += listingPanel(listing)
  })

  setOnClick()
}

loadAndInsertListings(1)

/**
 * sets onclick events for new bid btns
 */
function setOnClick() {
  const bidBtns = document.querySelectorAll('.bid-btn')
  bidBtns.forEach(function (btn) {
    btn.onclick = async function () {
      const id = btn.dataset.id
      const input = document.querySelector(`[data-id="${id}"]`)
      const amount = input.value
      const data = await addBid(id, amount)

      // Check for errors
      if ('errors' in data && data.errors.length) {
        window.alert(data.errors[0].message)
      } else {
        const filter = document.querySelector('#filter')
        loadAndInsertListings(filter.value)
        window.alert('Nice! You have the latest bid!')
      }
    }
  })
}
