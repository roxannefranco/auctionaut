import '../../css/app.css'
import loadListing from '../api/single.mjs'
import editListing from '../api/edit.mjs'
import deleteListing from '../api/deleteListing.mjs'

const title = document.querySelector('#listing-title')
const description = document.querySelector('#listing-description')
const media = [
  document.querySelector('#listing-media-1'),
  document.querySelector('#listing-media-2'),
  document.querySelector('#listing-media-3'),
  document.querySelector('#listing-media-4')
]

const urlParams = new URLSearchParams(window.location.search)
let id = null
if (urlParams.has('id')) {
  id = urlParams.get('id')
  load(id)
}

// loading existent listing content for user to update
async function load(id) {
  const data = await loadListing(id)
  title.value = data.title
  description.value = data.description

  // loop through media array to pass each img into input
  data.media.forEach(function (img, index) {
    const mediaInput = media[index]
    mediaInput.value = img
  })
}

const form = document.querySelector('#listing-form')
form.onsubmit = async function (event) {
  event.preventDefault()

  // loop to check if media URL was provided
  let mediaArray = []
  media.forEach(function (imgUrl) {
    if (imgUrl.value.length) {
      mediaArray.push(imgUrl.value)
    }
  })

  const data = {
    title: title.value.trim(),
    description: description.value.trim(),
    tags: ['gamernaut'],
    media: mediaArray
  }

  const response = await editListing(data, id)

  if ('errors' in response) {
    const errorsContainer = document.querySelector('#errors-container')
    errorsContainer.classList.remove('hidden')
    const { errors } = response
    errorsContainer.innerHTML = ''
    errors.map(function (error) {
      const { message } = error
      errorsContainer.innerHTML = `<p>${message}</p>`
    })
  } else {
    // if response is ok redirect to single listing page
    window.location.replace(`/single.html?id=${response.id}`)
  }
}

const deleteBtn = document.querySelector('#delete-btn')

deleteBtn.onclick = async function () {
  const remove = confirm('Are you sure you want to delete this Listing?')
  if (remove) {
    // call delete api
    await deleteListing(id)
    window.location.replace(`/index.html`)
  }
}
