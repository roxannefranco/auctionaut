import { search } from './icons'
import logo from './logo'

// selecting header element
const header = document.querySelector('header')

// insert content into html header
header.innerHTML = `
    <div class="center-content">
        <div class="flex">
            <div class="flex items-center">
                ${logo}
                <div class="relative ml-6">
                    <input id="search" class="search-input" placeholder="Search" />
                    <span class="search-icon">${search}</span>
                </div>
            </div>
            <div class="flex items-center">
                <a>Sign up</a>
                <a class="register-button">Register</a>
            </div>
        </div>
    </div>
`
