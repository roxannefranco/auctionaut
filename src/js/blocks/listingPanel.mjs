import { getUser } from '../functions.mjs'
import { credits } from '../blocks/icons.mjs'

/**
 * Handels logic for listing panel
 * @param {*} listing
 * @returns
 */
export function listingPanel(listing) {
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

  // Check if listing has media
  let media = '/img/nomedia.jpg'
  if (listing.media.length) {
    media = listing.media[0]
  }

  // Short description
  let description = listing.description
  if (description.length > 97) {
    description = description.slice(0, 97) + '...'
  }

  // find initial time
  const deadline = findTime(listing.endsAt)

  return `
    <a href="single.html?id=${listing.id}" class="listing-container">
      <div class="listing-content">
        <img class="listing-img" src="${media}" alt="${listing.title}">
        <h3 class="title-primary">${listing.title}</h3>
        <p class="listing-bio">${description}</p>
        <div class="seller">
          <img class="listings-avatar" src="${avatar}" alt="${listing.seller.name}">
          <span class="listings-details">@${listing.seller.name}</span>
        </div>  
      </div>

      <div class="listing-timer">
        <span class="text-slate-500 text-sm">Ends in:</span>
        <span class="text-slate-500 font-bold text-sm deadline" data-end="${listing.endsAt}">
          <span class="days">${deadline.days}</span><span>:</span><span class="hours">${deadline.hours}</span><span>:</span><span class="minutes">${deadline.minutes}</span><span>:</span><span class="seconds">${deadline.seconds}</span>
        </span>
      </div>

      <div class="listing-bidding">
        ${bidContent}
      </div>
    </a>
    `
}

/**
 * Handels logic for listing a simplified panel
 * @param {*} listing
 * @returns
 */
export function listingPanelSimplified(listing, profile) {
  // Check if user has avatar
  let avatar = '/img/noavatar.jpg'
  if (profile.avatar != '' && profile.avatar != null) {
    avatar = profile.avatar
  }

  console.log(listing)

  // Check if listing has media
  let media = '/img/nomedia.jpg'
  if (listing.media.length) {
    media = listing.media[0]
  }

  // Short description
  let description = listing.description
  if (description.length > 97) {
    description = description.slice(0, 97) + '...'
  }

  // check if listing has ended
  let timer = ''
  if (Date.parse(listing.endsAt) < Date.parse(new Date())) {
    timer = 'Game Over! Listing ended.'
  } else {
    // find initial time
    const deadline = findTime(listing.endsAt)
    timer = `<span class="days">${deadline.days}</span><span>:</span><span class="hours">${deadline.hours}</span><span>:</span><span class="minutes">${deadline.minutes}</span><span>:</span><span class="seconds">${deadline.seconds}</span>`
  }

  return `
    <a href="single.html?id=${listing.id}" class="listing-container listing-container-profile">

      <div class="listing-content">
        <img class="listing-img" src="${media}" alt="${listing.title}">
        <h3 class="title-primary">${listing.title}</h3>
        <p class="listing-bio">${description}</p>
        <div class="flex items-center mt-3">
          <img class="listings-avatar" src="${avatar}" alt="${profile.name}">
          <span class="listings-details">@${profile.name}</span>
        </div>  
      </div>

      <div class="listing-timer">
        <span class="text-slate-500 text-sm">Ends in:</span>
        <span class="text-slate-500 font-bold text-sm deadline" data-end="${listing.endsAt}">
         ${timer}
        </span>
      </div>
    </a>
    `
}

/**
 * Calculates listing deadline
 * @param {string} endsAt
 * @returns
 */
export function findTime(endsAt) {
  const total = Date.parse(endsAt) - Date.parse(new Date())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))

  return {
    seconds: pad(seconds),
    minutes: pad(minutes),
    hours: pad(hours),
    days: days
  }
}

function pad(num) {
  num = num.toString()
  while (num.length < 2) num = '0' + num
  return num
}
