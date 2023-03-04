import { getUser } from '../functions.mjs'
import { credits } from './icons.mjs'

/**
 * loads content side of single listing
 */
export default function loadContentSide(listing) {
  // Check if user has avatar
  let avatar = '/img/noavatar.jpg'
  if (listing.seller.avatar != '' && listing.seller.avatar != null) {
    avatar = listing.seller.avatar
  }

  // sort bids by highest amount first
  const bids = listing.bids.sort(function (a, b) {
    if (a.amount < b.amount) {
      return 1
    }

    if (a.amount > b.amount) {
      return -1
    }

    return 0
  })

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
    bidContent = `<div class="listing-left-block">
       <span class="text-slate-500 text-xs uppercase">Highest bid</span>
       <div class="highest-bid">
         <span class="credits">${credits}</span>
          <span class="text-violet-500 text-xl font-bold">${
            bids[0].amount
          } credits</span>
      </div>
    </div>

    <div class="listing-right">
      <div class="bid-input">
        <span class="credits">${credits}</span>
        <input type="number" min="${amount + 1}" value="${
      amount + 1
    }" data-id="${listing.id}">
        <button class="btn btn-primary btn-small bid-btn" >Bid now</button>
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

  // list of bids
  let history = ''
  bids.map(function (bid) {
    history += `
    <li class="bidder">
      <span class="bidder-name">@${bid.bidderName}</span>
      ${credits}
      <span class="bidded-amount">${bid.amount} credits</span>
    </li>
    `
  })

  return `
  <div>
    <div class="flex items-center mb-3">
      <h1 class="main-title !my-0 flex-1">${listing.title}</h1>
      <a class="btn btn-secondary btn-edit" href="edit.html?id=${listing.id}">Edit</a>
    </div>
    <p class="description text-sm text-slate-500">${listing.description}</p>
    <a href="profile.html?name=${listing.seller.name}" class="seller">
      <img class="listings-avatar" src="${avatar}" alt="${listing.seller.name}">
      <span class="listings-details">@${listing.seller.name}</span>
    </a>
  </div>

  <div class="listing-bidding mt-6 !px-0">
     ${bidContent}
  </div>

  <h3 class="uppercase text-slate-500 border-t border-slate-500 pt-6 mb-3 text-xs">History</h3>
  <ul class="bids-history">${history}</ul>
  `
}
