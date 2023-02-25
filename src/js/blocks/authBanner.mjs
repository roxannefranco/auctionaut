const authBanner = document.querySelector('#auth-page')

// Banner content
const bannerContent = `
<div class="flex flex-1 items-center justify-center bg-violet-900 rounded-r-[40px] relative">
      <div
        class="bg-[url('/img/bg.jpg')] absolute top-0 left-0 right-0 bottom-0 bg-cover rounded-r-[40px] opacity-10 bg-center pointer-events-none">
      </div>
      <div class="text-center">
        <h1 class="text-5xl text-white font-bold text-center w-96">Deals from out of this world!</h1>
        <h3 class="text-white pt-7">Explore the Universe of Gaming.</h3>
      </div>
    </div>
    `
// adding content to exhisting content
authBanner.innerHTML = bannerContent + authBanner.innerHTML
