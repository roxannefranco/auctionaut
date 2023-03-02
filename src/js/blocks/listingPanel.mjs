import { getUser } from '../functions.mjs'
import { credits } from '../blocks/icons.mjs'

/**
 * Handels logic for listing panel
 * @param {*} listing
 * @returns
 */
export default function listingPanel(listing) {
  // Check the amount of last bid
  let amount = 0
  if (listing._count.bids) {
    amount = listing.bids.reduce(function (a, b) {
      if (a.amount > b.amount) {
        return a
      } else {
        return b
      }
    }).amount
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
        <input type="number" min="${amount + 1}" value="${
      amount + 1
    }" data-id="${listing.id}">
        <button class="btn btn-primary btn-small bid-btn" data-id="${
          listing.id
        }">Bid now</button>
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

  // Check if user has avatar
  let avatar = '/img/noavatar.jpg'
  if (listing.seller.avatar != '' && listing.seller.avatar != null) {
    avatar = listing.seller.avatar
  }

  // Short description
  let description = listing.description
  if (description.length > 97) {
    description = description.slice(0, 97) + '...'
  }

  return `
    <div class="listing-container">

      <div class="listing-content">
        <img class="listing-img" src="${listing.media[0]}" alt="${listing.title}">
        <h3 class="title-primary">${listing.title}</h3>
        <p class="listing-bio">${description}</p>
        <div class="flex items-center mt-3">
          <img class="listings-avatar" src="${avatar}" alt="${listing.seller.name}">
          <span class="listings-details">@${listing.seller.name}</span>
        </div>  
      </div>

      <div class="listing-bidding">
        ${bidContent}
      </div>
        
      </div>
    </div>
    `
}
