import { footerLogo } from './icons.mjs'

// selecting footer element
const footer = document.querySelector('footer')

// insert content into html footer
footer.innerHTML = `
    <div class="center-content">
        <div class="flex items-center justify-between">
            ${footerLogo}
            <span class="text-slate-500 text-sm">All rights reserved © 2023</span>
        </div>
    </div>
`
