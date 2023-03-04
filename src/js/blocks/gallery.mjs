import { left, right } from './icons.mjs'

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

  return `
        <div class="gallery-container">
            <div class="images">
                ${imgs}
            </div>
        </div>
        ${buttons}
    `
}
