import '../../css/app.css'
import getListings from '../api/getListings.mjs'

async function loadAndInsertListings() {
  // Get listings from API
  const listings = await getListings()

  // insert listings into HTML
  const listingsContainer = document.querySelector('#listings-container')

  console.log(listings)
  listings.map(function (listing) {
    listingsContainer.innerHTML += `
        <div>${listing.title}</div>
    `
  })
}

loadAndInsertListings()
