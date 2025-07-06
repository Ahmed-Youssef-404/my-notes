import { useState, type FormEvent, type ChangeEvent, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

interface FormData {
    email: string;
    password: string;
    confirmPassword: string
}

const SignUp = () => {

    const themContext = useContext(ThemeContext);
    if (!themContext) throw new Error("Error loading the theme");

    const { theme } = themContext;
    const isDark = theme === "dark";

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const passwordRef = useRef<HTMLInputElement>(null)
    const togglePasswordRef = useRef<HTMLButtonElement>(null)


    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Handle sign in logic here
        setIsLoading(true);
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsLoading(false);
            navigate('/')
        }, 2500);
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

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className={`${isDark ? 'bg-gray-800/70' : 'bg-[#957cae4b]'}  py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-colors duration-300 ${isDark ? 'border border-gray-700' : ''}`}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="text" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                User name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                <button
                                    type="button"
                                    ref={togglePasswordRef}
                                    onClick={togglePasswordVisibility}
                                    className={`absolute inset-y-0 right-0 px-3 flex items-center text-sm ${isDark?'text-blue-200':'text-purple-500'} hover:underline`}
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
                                    autoComplete="confirm-password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
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