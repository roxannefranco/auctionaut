import '../../css/app.css'
import loadListing from '../api/single.mjs'

const urlParams = new URLSearchParams(window.location.search)
let id = null
if (urlParams.has('id')) {
  id = urlParams.get('id')
  load(id)
}

async function load(id) {
  const data = await loadListing(id)
  console.log(data)
}
