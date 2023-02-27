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
    <div class="listing-container">
      <div class="listing-content">
        <div>
          <img src="${listing.media[0]}" alt="${listing.title}">
          <h3>${listing.title}</h3>
          <p>${listing.description}</p>
            <div>
              <span>${listing.seller.avatar}</span>
              <span>${listing.seller.name}</span>
            </div>
        </div>
      </div>
    </div>
    `
  })
}

loadAndInsertListings()
