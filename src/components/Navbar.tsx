import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import avatarIcon from "../assets/user.webp";
// import profileIcon2 from "../assets/user2.jpg";
// import profileIcon3 from "../assets/user3.png";
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
    const userAvatar = profile?.user_profile;
    // console.log(userAvatar)

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
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

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [menuOpen]);

    return (
        <>
            <nav
                className={`${isDark ? "bg-[#241b30]" : "bg-white"
                    } textw theme shadow-sm fixed z-20 w-full`}
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
                        <div className="hidden flexing items-center gap-6 mx-15">
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
                                <NavLink to={"/user"} className="flex items-center justify-center gap-2" title="Your Profile">
                                    <img src={userAvatar ? userAvatar : avatarIcon} alt="usre avatar" className="w-10 rounded-2xl" />
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
                                ref={buttonRef}
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="hiding focus:outline-none"
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
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-0 z-10 hiding ${menuOpen ? 'block' : 'hidden'}`}
            >
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black opacity-50 ${menuOpen ? 'block' : 'hidden'}`}
                    onClick={() => setMenuOpen(false)}
                />

                {/* Sidebar */}
                <div
                    ref={menuRef}
                    className={`fixed top-0 right-0 h-full w-64 z-20 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
                        } ${isDark ? "bg-[#1a0f28]" : "bg-[#f2f8fc]"} shadow-lg`}
                >
                    <div className="flex flex-col h-full p-4">
                        <div className="flex items-center justify-between mb-8">
                            <button onClick={() => {
                                navigate('/');
                                setMenuOpen(false);
                            }} className="text-2xl">
                                <div
                                    className="text-2xl font-bold"
                                    style={{ color: "var(--logo-my)" }}
                                >
                                    My<span style={{ color: "var(--logo-note)" }}>Notes</span>
                                </div>
                            </button>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className={`flex flex-col space-y-4 flex-grow`}>
                            <NavLink
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                className={`font-satoshi p-3 rounded-lg ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/tags"
                                onClick={() => setMenuOpen(false)}
                                className={`font-satoshi p-3 rounded-lg ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                            >
                                Tags
                            </NavLink>
                            <NavLink
                                to="newtag"
                                onClick={() => setMenuOpen(false)}
                                className={`font-satoshi p-3 rounded-lg ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                            >
                                Add new tag
                            </NavLink>
                            <NavLink
                                onClick={() => setMenuOpen(false)}
                                to="notes"
                                className={`font-satoshi p-3 rounded-lg ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                            >
                                Notes
                            </NavLink>
                            <NavLink
                                onClick={() => setMenuOpen(false)}
                                to="search"
                                className={`font-satoshi p-3 rounded-lg ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                            >
                                Search
                            </NavLink>
                        </div>

                        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                className={`flex items-center gap-3 p-3 rounded-lg w-full ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                                onClick={() => {
                                    toggleTheme();
                                    setMenuOpen(false);
                                }}
                            >
                                {!isDark ? (
                                    <img
                                        src={sun}
                                        alt="sun"
                                        className="w-5"
                                        title="convert to Dark mode"
                                    />
                                ) : (
                                    <img
                                        src={moon}
                                        alt="moon"
                                        className="w-5"
                                        title="convert to Light mode"
                                    />
                                )}
                                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                            </button>

                            {user && user.id ? (
                                <NavLink
                                    to="/user"
                                    onClick={() => setMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? "text-white hover:bg-purple-900" : "text-black hover:bg-[#ededed]"}`}
                                >
                                    <img src={userAvatar ? userAvatar : avatarIcon} alt="user avatar" className="w-5" />
                                    <span>{userName}</span>
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className={`block button-gradient rounded-lg text-white py-3 px-4 text-center mt-2`}
                                >
                                    Get Started
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;