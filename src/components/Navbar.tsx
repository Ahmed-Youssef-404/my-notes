// import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import profileIcon from "../assets/user.webp";
import moon from "../assets/moon.webp";
import sun from "../assets/daylight.webp";
import { useAuth } from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { useProfile } from "../hooks/useProfile";

const Navbar = () => {
    const { isDark, toggleTheme } = useTheme();
    const { user } = useAuth();
    const { profile } = useProfile();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const userName = profile?.username;

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);



    return (
        <nav
            className={`${isDark ? "bg-[#241b30]" : "bg-white"
                } textw theme shadow-sm fixed z-10 w-full`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left section - Logo */}

                    <button onClick={() => { navigate('/') }} className=" text-2xl ">
                        <div
                            className="text-2xl md:text-3xl font-bold"
                            style={{ color: "var(--logo-my)" }}
                        >
                            My<span style={{ color: "var(--logo-note)" }}>Notes</span>
                        </div>
                    </button>

                    {/* Nav links */}
                    <div className="hidden lg:flex items-center gap-6 mx-15">
                        <NavLink
                            to="/"
                            className={`font-satoshi ${isDark ? "text-white" : "text-black"
                                } hover:text-blue-600`}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="tags"
                            className={`font-satoshi ${isDark ? "text-white" : "text-black"
                                } hover:text-blue-600`}
                        >
                            Tags
                        </NavLink>
                        <NavLink
                            to="newtag"
                            className={`font-satoshi ${isDark ? "text-white" : "text-black"
                                } hover:text-blue-600`}
                        >
                            Add new tag
                        </NavLink>
                        <NavLink
                            to="notes"
                            className={`font-satoshi ${isDark ? "text-white" : "text-black"
                                } hover:text-blue-600`}
                        >
                            Notes
                        </NavLink>
                        <NavLink
                            to="search"
                            className={`font-satoshi ${isDark ? "text-white" : "text-black"
                                } hover:text-blue-600`}
                        >
                            Search
                        </NavLink>
                        <button className="cursor-pointer" onClick={toggleTheme}>
                            {!isDark ? (
                                <img
                                    src={sun}
                                    alt="sun"
                                    className="w-6"
                                    title="convert to Dark mode"
                                ></img>
                            ) : (
                                <img
                                    src={moon}
                                    alt="moon"
                                    className="w-5"
                                    title="convert to Light mode"
                                ></img>
                            )}
                        </button>
                    </div>

                    {/* Right section - Icons */}
                    <div className="flex items-center justify-center gap-4">
                        {/* User Avatar */}
                        {user && user.id ? (
                            <NavLink to={"/user"} className="flex gap-2" title="Your Profile">
                                <img src={profileIcon} alt="usre avatar" className="w-6" />
                                <span style={{ color: ('var(--color-text)') }}>{userName}</span>
                            </NavLink>
                        ) : (
                            <NavLink to={"/login"}>
                                <button
                                    className={`button-gradient rounded-3xl text-white py-2 px-1.5 w-32 cursor-pointer`}
                                >
                                    Get Started
                                </button>
                            </NavLink>
                        )}

                        {/* Hamburger for Mobile */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden focus:outline-none"
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
                                    d={
                                        menuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className={`flex flex-col lg:hidden px-4 py-2 space-y-2 ${isDark ? "bg-purple-950" : "bg-gray-200"
                        } border-t shadow animate-slideDown`}
                >
                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={`font-satoshi ${isDark ? "text-white" : "text-black"
                            } hover:text-blue-600`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/tags"
                        onClick={() => setMenuOpen(false)}
                        className={`font-satoshi ${isDark ? "text-white" : "text-black"
                            } hover:text-blue-600`}
                    >
                        Tags
                    </NavLink>
                    <NavLink
                        to="newtag"
                        onClick={() => setMenuOpen(false)}
                        className={`font-satoshi ${isDark ? "text-white" : "text-black"
                            } hover:text-blue-600`}
                    >
                        Add new tag
                    </NavLink>
                    <NavLink
                        onClick={() => setMenuOpen(false)}
                        to="search"
                        className={`font-satoshi ${isDark ? "text-white" : "text-black"
                            } hover:text-blue-600`}
                    >
                        Search
                    </NavLink>
                    <button className="cursor-pointer" onClick={() => {
                        toggleTheme()
                        setMenuOpen(false)
                    }}>
                        {!isDark ? (
                            <img
                                src={sun}
                                alt="sun"
                                className="w-6"
                                title="convert to Dark mode"
                            ></img>
                        ) : (
                            <img
                                src={moon}
                                alt="moon"
                                className="w-5"
                                title="convert to Light mode"
                            ></img>
                        )}
                    </button>


                </div>
            )
            }
        </nav >
    );
};

export default Navbar;
