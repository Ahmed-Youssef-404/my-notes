import { useState, type FormEvent, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
// import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';


const LogIn = () => {
    const navigate = useNavigate()
    const { isLoading, setIsLoading, user, setUser } = useAuth()

    const { isDark } = useTheme()
    // const [isLoading, setIsLoading] = useState<boolean>(false)

    




    const emilRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null)
    const togglePasswordRef = useRef<HTMLButtonElement>(null)

    const USERS_URL = 'http://localhost:3001/users'

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true)
            const email = emilRef.current?.value
            const password = passwordRef.current?.value

            
            const res = await fetch(`${USERS_URL}?email=${email}&password=${password}`)
            const data = await res.json()
            if (data.length > 0) {
                const userData = data[0]
                const { password, ...dataToStore } = userData
                setUser(dataToStore)
                console.log(dataToStore)
                localStorage.setItem("user", JSON.stringify(dataToStore))
                navigate('/')
            } else {
                setIsLoading(false)
                alert('Invalid credentials')
            }
            setIsLoading(false)
        } catch (error) {
            console.log("error in login " + error)
        }
    };

    // const handleChange = ()=>{

    // }


    const togglePasswordVisibility = () => {
        const input = passwordRef.current;
        const button = togglePasswordRef.current;
        if (!input || !button) return

        if (input.type === 'password') {
            input.type = 'text'
            button.textContent = 'Hide'
        } else {
            input.type = 'password'
            button.textContent = 'Show'
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
                    Sign in to your account
                </h2>
                <p className={`mt-2 text-center text-sm`} style={{ color: 'var(--color-text-light)' }}>
                    Or{' '}
                    <Link to="/signup" className={`font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}>
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="mt-8 px-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className={`${isDark ? 'bg-gray-800/70' : 'bg-[#957cae4b]'}  py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-colors duration-300 ${isDark ? 'border border-gray-700' : ''}`}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="text" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    ref={emilRef}
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
                            <button
                                type="submit"
                                className="button-gradient w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:!bg-green-700  focus:outline-none transition-all duration-300"
                            >
                                {isLoading ? <LoadingSpinner /> : "Log In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LogIn;