import { left, right } from './icons.mjs'
import { findTime } from './listingPanel.mjs'

export default function gallery(images, endsAt) {
  // check images
  let imgs = ''
  images.map(function (img, index) {
    imgs += `
        <div class="image" data-item="${index}">
            <img src="${img}" alt="Listing image${index}">
        </div>
    `
  })

  // check if it needs next+prev buttons
  let buttons = ''
  if (images.length) {
    buttons = `
    <div class="gallery-btns">
        <button id="prev">${left}</button>
        <button id="next">${right}</button>
    </div>
    `
  }

  // check if listing has ended
  let timer = ''
  if (Date.parse(endsAt) < Date.parse(new Date())) {
    timer = 'Game Over! Listing ended.'
  } else {
    // find initial time
    const deadline = findTime(endsAt)
    timer = `<span class="days">${deadline.days}</span><span>:</span><span class="hours">${deadline.hours}</span><span>:</span><span class="minutes">${deadline.minutes}</span><span>:</span><span class="seconds">${deadline.seconds}</span>`
  }

  return `
        <div class="gallery-container">
            <div class="images">
                ${imgs}
            </div>
        </div>
        ${buttons}
        <div class="timer-container">
            <div class="single-listing-timer">
                <span class="text-slate-600 font-bold text-3xl deadline" data-end="${endsAt}">
                ${timer}
                </span>
            </div>
        </div>
    `
}
