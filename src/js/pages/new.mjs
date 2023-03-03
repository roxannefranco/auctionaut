import '../../css/app.css'
import newListing from '../api/new.mjs'

const form = document.querySelector('#listing-form')
const title = document.querySelector('#listing-title')
const description = document.querySelector('#listing-description')
const date = document.querySelector('#listing-date')
const media = [
  document.querySelector('#listing-media-1'),
  document.querySelector('#listing-media-2'),
  document.querySelector('#listing-media-3'),
  document.querySelector('#listing-media-4')
]

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
    title: title.value,
    description: description.value,
    endsAt: date.value,
    tags: ['gamernaut'],
    media: mediaArray
  }

  const response = await newListing(data)
  console.log(response)

  if ('errors' in response) {
    const errorsContainer = document.querySelector('#errors-container')
    errors.classList.remove('hidden')
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
