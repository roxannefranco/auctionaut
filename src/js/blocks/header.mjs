import { search } from './icons.mjs'
import logo from './logo.mjs'

// selecting header element
const header = document.querySelector('header')

// insert content into html header
header.innerHTML = `
    <div class="center-content">
        <div class="flex items-center">
            <div class="flex items-center">
                <a class="cursor-pointer"href="#">${logo}</a>
                <div class="search-input-container">
                    <input id="search" class="search-input" placeholder="Search" />
                    <span class="search-icon">${search}</span>
                </div>
            </div>
            <div class="user-actions">
                <a href="login.html" class="btn btn-secondary">Sign in</a>
                <a href="register.html" class="btn btn-primary">Register</a>
            </div>
        </div>
    </div>
`
