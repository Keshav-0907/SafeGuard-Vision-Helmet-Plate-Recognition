import React from 'react'

const Navbar = () => {
    return (
        <nav class="bg-gray-900 text-white p-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <span class="text-sm font-semibold">Survillance Sustem</span>
                </div>

                <div class="flex space-x-4">
                    <a href="/" class="hover:text-gray-300">Home</a>
                    <a href="/addnew" class="hover:text-gray-300">Add New</a>
                    <a href="/alert" class="hover:text-gray-300">Alerts</a>
                </div>
            </div>
        </nav>

    )
}

export default Navbar