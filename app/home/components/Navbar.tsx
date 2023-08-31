import React from 'react'

export default function Navbar() {
    return (
        <nav className="flex justify-around py-4 bg-white/80
            backdrop-blur-md shadow-md w-full
            fixed top-0 left-0 right-0 z-10">

            <div className="flex items-center">
                <a className="cursor-pointer">
                    <h3 className="text-2xl font-medium text-blue-500">
                        <img className="h-10 object-cover"
                            src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg" alt="Store Logo" />
                    </h3>
                </a>
            </div>

            <div className="items-center hidden space-x-8 lg:flex">
                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Home
                </a>

                <a className="flex text-gray-600 
                    cursor-pointer transition-colors duration-300
                    font-semibold ">
                    Themes
                </a>

                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Developers
                </a>

                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Pricing
                </a>

                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    Blog
                </a>

                <a className="flex text-gray-600 hover:text-blue-500
                    cursor-pointer transition-colors duration-300">
                    About Us
                </a>
            </div>


        </nav>
    )
}
