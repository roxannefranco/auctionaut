const authBanner = document.querySelector('#auth-section')

// Banner content
const bannerContent = `
<div class="banner-container">
      <div
        class="banner-bg">
      </div>
      <div class="text-center">
        <h1 class="banner-title">Deals from out of this world!</h1>
        <h3 class="banner-slogan">Explore the Universe of Gaming.</h3>
      </div>
    </div>
    `
// adding content to exhisting content
authBanner.innerHTML = bannerContent + authBanner.innerHTML
