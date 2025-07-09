import { useState, type FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';



const SignUp = () => {

    const { isDark } = useTheme()
    const {user, setUser } = useAuth()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)


    const userNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)
    const togglePasswordRef = useRef<HTMLButtonElement>(null)

    const USERS_API_URL = 'http://localhost:3001/users'

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle sign up logic here
        const username = userNameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value

        console.log(username, email, password, confirmPassword)

        const authData = {
            "username": username,
            "password": password,
            "email": email
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return
        } else {
            setIsLoading(true)
            const check = await fetch(`${USERS_API_URL}?email=${email}`)
            const exists = await check.json()
            if (exists.length > 0) {
                setIsLoading(false)
                alert('E-Mail already exists')
                return
            } else {
                const res = await fetch(USERS_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(authData)
                })
                const newUser = await res.json()
                setUser(newUser)
                const { password, confirmPassword, ...dataToStore } = newUser
                localStorage.setItem("user", JSON.stringify(dataToStore))
                navigate('/')
                setIsLoading(false)
            }
        }

    };

    const togglePasswordVisibility = () => {
        const input = passwordRef.current;
        const btnText = togglePasswordRef.current;

        if (!input || !btnText) return;

        if (input.type === "password") {
            input.type = "text";
            btnText.textContent = "Hide";
        } else {
            input.type = "password";
            btnText.textContent = "Show";
        }
    }
    if (user) {
        return (
            <div className="add text-white min-h-screen" style={{ background: 'var(--color-bg)' }}>
            <section className="py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-3xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                        <span>You are already loged in as </span><span style={{ color: 'var(--logo-note)' }}>{user?.username}</span>
                    </h3>
                    {/* bg-gradient-to-r from-purple-600 to-blue-500  */}
                    <button onClick={() => navigate('*')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Show your Tags
                    </button>
                </div>
            </section>
        </div>
        )
    }

    return (
        <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300`} style={{ background: 'var(--color-bg)' }}>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className={`mt-6 text-center text-3xl font-extrabold`} style={{ color: 'var(--color-text)' }}>
                    Creat New Account
                </h2>
                <p className={`mt-2 text-center text-sm`} style={{ color: 'var(--color-text-light)' }}>
                    Already have an account?{' '}
                    <Link to="/login" className={`font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}>
                        Log In now
                    </Link>
                </p>
            </div>

            <div className="mt-8 px-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className={`${isDark ? 'bg-gray-800/70' : 'bg-[#957cae4b]'}  py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-colors duration-300 ${isDark ? 'border border-gray-700' : ''}`}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="text" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                User name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    ref={userNameRef}
                                    autoComplete="userName"
                                    required
                                    // value={formData.email}
                                    // onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="text" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                E-Mail
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    ref={emailRef}
                                    autoComplete="email"
                                    required
                                    // value={formData.email}
                                    // onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    ref={passwordRef}
                                    autoComplete="current-password"
                                    required
                                    // value={formData.password}
                                    // onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                <button
                                    type="button"
                                    ref={togglePasswordRef}
                                    onClick={togglePasswordVisibility}
                                    className={`absolute inset-y-0 right-0 px-3 flex items-center text-sm ${isDark ? 'text-blue-200' : 'text-purple-500'} hover:underline`}
                                >show</button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Confirm Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    ref={confirmPasswordRef}
                                    autoComplete="confirm-password"
                                    required
                                    // value={formData.confirmPassword}
                                    // onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="button-gradient w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:!bg-green-700  focus:outline-none transition-all duration-300"
                            >
                                {isLoading ? <LoadingSpinner /> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;