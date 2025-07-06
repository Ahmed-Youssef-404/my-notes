// import React from 'react'
import { NavLink } from "react-router-dom";
import { useState } from "react";


const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section - Logo */}
                    <div className="flex items-center gap-4">
                        <NavLink to={"/"} className="font-integral text-2xl ">SHOP.CO</NavLink>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-6 mx-15">
                            <div className="relative group">
                                <button
                                    aria-label="Shop Dropdown"
                                    className="flex items-center gap-1 font-satoshi text-black hover:text-gray-600"
                                >
                                    Shop
                                    <svg
                                        className="w-4 h-4 text-gray-800"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 9-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div className="absolute hidden group-hover:block bg-white w-40 border shadow-md rounded-md z-10 transition-all duration-200 ">
                                    <NavLink
                                        to="/option1"
                                        className="font-satoshi block px-4 py-2 hover:bg-gray-200"
                                    >
                                        Option 1
                                    </NavLink>
                                    <NavLink
                                        to="/option2"
                                        className="font-satoshi block px-4 py-2 hover:bg-gray-200"
                                    >
                                        Option 2
                                    </NavLink>
                                </div>
                            </div>
                            <NavLink
                                to="/onsale"
                                className="font-satoshi text-black hover:text-gray-600"
                            >
                                On Sale
                            </NavLink>
                            <NavLink
                                to="/newarrivals"
                                className="font-satoshi text-black hover:text-gray-600"
                            >
                                New Arrivals
                            </NavLink>
                            <NavLink
                                to="/brands"
                                className="font-satoshi text-black hover:text-gray-600"
                            >
                                Brands
                            </NavLink>
                        </div>
                    </div>

                    {/* Middle section - Search */}
                    <div className="flex-1 px-4 max-w-md hidden md:block">
                        <div className="relative">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search for products..."
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right section - Icons */}
                    <div className="flex items-center justify-center gap-4">
                        {/* Cart */}
                        <NavLink to="/cart" className="text-gray-500 hover:text-gray-600" title="Your Cart">
                            <svg
                                className="w-6 h-6 text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                />
                            </svg>
                        </NavLink>

                        {/* User Avatar */}
                        <NavLink to="/login" className="focus:outline-none" title="Your Profile">
                            <svg
                                className="w-6 h-6 text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </NavLink>

                        {/* Hamburger for Mobile */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6 text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>


            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-4 py-2 space-y-2 bg-gray-200 border-t shadow animate-slideDown">
                    <NavLink
                        to="/"
                        className="block font-satoshi text-black hover:text-gray-600"
                    >
                        Shop
                    </NavLink>
                    <NavLink
                        to="/"
                        className="block font-satoshi text-black hover:text-gray-600"
                    >
                        On Sale
                    </NavLink>
                    <NavLink
                        to="/"
                        className="block font-satoshi text-black hover:text-gray-600"
                    >
                        New Arrivals
                    </NavLink>
                    <NavLink
                        to="/"
                        className="block font-satoshi text-black hover:text-gray-600"
                    >
                        Brands
                    </NavLink>

                    <div className="flex-1 max-w-md md:block">
                        <div className="relative">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search for products..."
                                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                <svg
                                    className="w-4 h-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar


