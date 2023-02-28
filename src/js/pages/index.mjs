import '../../css/app.css'
import getListings from '../api/getListings.mjs'
import { getUser } from '../functions.mjs'
import { credits } from '../blocks/icons.mjs'

async function loadAndInsertListings() {
  // Get listings from API
  const listings = await getListings()

  // insert listings into HTML
  const listingsContainer = document.querySelector('#listings-container')

  listings.map(function (listing) {
    // Check the amount of last bid
    const lastBid = listing._count.bids - 1
    let amount = 0
    if (lastBid >= 0) {
      amount = listing.bids[lastBid].amount
    }

    // Check if user is authenticated
    let bidContent = ''
    const user = getUser()

    if (user != null) {
      bidContent = `<div class="listing-left">
      <span class="text-slate-500">${listing._count.bids} bids</span>
    </div>

    <div class="listing-right">
      <div class="bid-input">
        <span class="credits">${credits}</span>
        <input type="number" min="${amount + 1}" value="${amount + 1}">
        <button class="btn btn-primary btn-small">Bid now</button>
      </div>
    </div>`
    } else {
      bidContent = `<div class="listing-left">
      <a class="btn btn-primary btn-small" href="login.html">Login to Bid</a>
      <span class="text-slate-500">${listing._count.bids} bids</span>
    </div>

    <div class="listing-right">
      <span class="credits">${credits}</span>
      <span class="listing-credit">${amount}</span>
    </div>`
    }

    // Add everything to html
    listingsContainer.innerHTML += `
    <div class="listing-container">

      <div class="listing-content">
        <img class="listing-img" src="${listing.media[0]}" alt="${listing.title}">
        <h3 class="title-primary">${listing.title}</h3>
        <p class="listing-bio">${listing.description}</p>
        <div class="flex items-center mt-3">
          <img class="listings-avatar" src="${listing.seller.avatar}" alt="${listing.title}">
          <span class="listings-details">@${listing.seller.name}</span>
        </div>  
      </div>

      <div class="listing-bidding">
        ${bidContent}
      </div>
        
      </div>
    </div>
    `
  })
}

loadAndInsertListings()
