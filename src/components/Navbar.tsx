// import React from 'react'
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import profileIcon from '../assets/user.webp';
import moon from '../assets/moon.webp'
import sun from '../assets/daylight.webp'
import { useAuth } from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";


const Navbar = () => {

    const {isDark, toggleTheme} = useTheme()

    const [isLogedIN, setIsLogedIn] = useState(false);
    const { user } = useAuth()
    const userName = user?.username;

    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (user) {
            setIsLogedIn(true)
        }else(
            setIsLogedIn(false)
        )
    }, [user])


    return (
        <nav className={`${isDark ? 'bg-[#241b30]' : 'bg-white'} textw theme shadow-sm fixed z-10 w-full`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section - Logo */}

                    <NavLink to={"/"} className=" text-2xl ">
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--logo-my)' }}>
                            My<span style={{ color: 'var(--logo-note)' }}>Notes</span>
                        </div>
                    </NavLink>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-6 mx-15">

                        <NavLink
                            to="/"
                            className={`font-satoshi ${isDark ? 'text-white' : 'text-black'} hover:text-blue-600`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="tags"
                            className={`font-satoshi ${isDark ? 'text-white' : 'text-black'} hover:text-blue-600`}
                        >
                            Tags
                        </NavLink>
                        <button className="cursor-pointer" onClick={toggleTheme}>
                            {!isDark ?
                                <img src={sun} alt="sun" className="w-6" title="convert to Dark mode"></img>
                                : <img src={moon} alt="moon" className="w-5" title="convert to Light mode"></img>}
                        </button>
                    </div>


                    {/* Middle section - Search */}
                    {/* px-4 max-w-md hidden md:block */}
                    <div className={`flex-1 px-4 max-w-md hidden ${isLogedIN ? 'md:block' : ''} `}>
                        <div className="relative">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search for Notes"
                                className={`w-full pl-10 pr-4 py-2 rounded-md border  ${isDark ? 'text-white' : 'text-black'} border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
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

                        {/* User Avatar */}
                        {isLogedIN ?

                            <NavLink to={'/user'} className="flex gap-2" title="Your Profile">
                                <img src={profileIcon} alt="usre avatar" className="w-6" />
                                <span style={{ color: ('var(--color-text)') }}>{userName}</span>
                            </NavLink>
                            : <NavLink to={'/login'}>
                                <button className={`button-gradient rounded-3xl text-white py-2 px-1.5 w-32 cursor-pointer`}>Get Started</button>
                            </NavLink>
                        }

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
                <div className={`flex flex-col md:hidden px-4 py-2 space-y-2 ${isDark ? 'bg-purple-950' : 'bg-gray-200'} border-t shadow animate-slideDown`}>
                    <NavLink
                        to="/"
                        className={`font-satoshi ${isDark ? 'text-white' : 'text-black'} hover:text-blue-600`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/tags"
                        className={`font-satoshi ${isDark ? 'text-white' : 'text-black'} hover:text-blue-600`}
                    >
                        Tags
                    </NavLink>
                    <button className="cursor-pointer" onClick={toggleTheme}>
                        {!isDark ?
                            <img src={sun} alt="sun" className="w-6" title="convert to Dark mode"></img>
                            : <img src={moon} alt="moon" className="w-5" title="convert to Light mode"></img>}
                    </button>

                    <div className={`flex-1 max-w-md ${isLogedIN ? 'block' : 'hidden'}`}>
                        <div className="relative">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search for Notes"
                                className={`w-full pl-10 pr-4 py-2 rounded-md border  ${isDark ? 'text-white' : 'text-black'} border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
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


