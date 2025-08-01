import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
// import { useAuth } from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { useSignUp } from '../hooks/useSignUp';
import { usernameSchema } from '../validators/validationSchemas';
import { emailSchema } from '../validators/validationSchemas';
import { passwordSchema } from '../validators/validationSchemas';


const SignUp = () => {
    // const { user, setUser } = useAuth() 
    // const navigate = useNavigate()

    const { isDark } = useTheme()
    const { handleSignUp, loading, isError, signupErrorCount } = useSignUp();
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [showInputPopup, setShowInputPopup] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [shown, setShown] = useState(false)

    const [inputData, setInputData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [isValidInput, setIsValidInput] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const [inputErrorText, setInputErrorText] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (isError) {
            setShowPopup(true)
            setShowAuthPopup(true);
        } else {
            closePupup()
        }
    }, [signupErrorCount]);

    const closePupup = () => {
        setShowPopup(false)
        setShowAuthPopup(false);
        setShowInputPopup(false)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle sign up logic here
        const { confirmPassword, ...authData } = inputData

        // console.log(isValidInput)
        if (!Object.values(isValidInput).every(Boolean)) {
            // alert('Please make sure all fields are valid');
            setShowPopup(true)
            setShowInputPopup(true)
            console.log(isValidInput);
            return;
        }

        handleSignUp(authData)
    };


    const handleUsernameChange = (text: string) => {
        try {
            usernameSchema.validateSync(text)
            // console.log("is valid username?", true)
            setInputErrorText({ ...inputErrorText, username: "" })
            setIsValidInput({ ...isValidInput, username: true })
        } catch (error: any) {
            // console.log("is valid username?", false)
            setInputErrorText({ ...inputErrorText, username: error.message })
            setIsValidInput({ ...isValidInput, username: false })
        }
    }
    const handleEmailChange = (text: string) => {
        try {
            emailSchema.validateSync(text)
            // console.log("is valid email ", true)
            setInputErrorText((prev) => ({ ...prev, email: "" }))
            setIsValidInput((prev) => ({ ...prev, email: true }))
        } catch (error: any) {
            setInputErrorText((prev) => ({ ...prev, email: error.message }))
            setIsValidInput((prev) => ({ ...prev, email: false }))
            // console.log("is valid email ", false)
            // console.log(error)
            // console.log("inuptError value: ", inputError.email)
        }
    }



    const handlePasswordChange = (text: string) => {
        try {
            passwordSchema.validateSync(text)
            // console.log("is valid password?", true)
            setInputErrorText({ ...inputErrorText, password: "" })
            setIsValidInput({ ...isValidInput, password: true })
        } catch (error: any) {
            // console.log("is valid password?", false)
            setInputErrorText({ ...inputErrorText, password: error.message })
            setIsValidInput({ ...isValidInput, password: false })
        }
    }



    // Check for passwords matching
    useEffect(() => {
        const password = inputData.password
        const confirmPassword = inputData.confirmPassword
        // console.log("password: ", password)
        // console.log("confirm password: ", confirmPassword)
        if (confirmPassword !== password) {
            setInputErrorText((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }))
            setIsValidInput((prev) => ({ ...prev, confirmPassword: false }))
        } else {
            setInputErrorText((prev) => ({ ...prev, confirmPassword: "" }))
            setIsValidInput((prev) => ({ ...prev, confirmPassword: true }))
        }

    }, [inputData.password, inputData.confirmPassword])


    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };



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
                        {/* <div className='flex items-center justify-between flex-col sm:flex-row gap-8 sm:gap-16'>
                            <div className="w-full">
                                <label htmlFor="userAvatar" className={`mb-1 block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    User Image
                                </label>
                                <input
                                    id="userAvatar"
                                    name="userAvatar"
                                    type="file"
                                    accept="image/*"
                                    // ref={userAvatar}
                                    required
                                    onChange={handleImageChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                            {previewUrl && (
                                <div className="">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-w-[200px] rounded-md border border-gray-300 shadow"
                                    />
                                </div>
                            )}
                        </div> */}
                        <div>
                            <label htmlFor="text" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                User name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="userName"
                                    name="userName"
                                    type="text"
                                    autoComplete="userName"
                                    required
                                    value={inputData.username}
                                    onChange={(e) => {
                                        setInputData((prev) => ({
                                            ...prev,
                                            username: e.target.value,
                                        }));
                                        handleUsernameChange(e.target.value)
                                    }}


                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                {!isValidInput.username && <span className='text-red-500'>{inputErrorText.username}</span>}
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
                                    autoComplete="email"
                                    required
                                    value={inputData.email}
                                    onChange={(e) => {
                                        setInputData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }));
                                        handleEmailChange(e.target.value)
                                    }}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                {!isValidInput.email && <span className='text-red-500'>{inputErrorText.email}</span>}
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
                                    type={shown ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={inputData.password}
                                    onChange={
                                        (e) => {
                                            setInputData({ ...inputData, password: e.target.value });
                                            handlePasswordChange(e.target.value);
                                        }
                                    }
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShown((prev) => !prev)
                                    }}
                                    className={`absolute inset-y-0 right-0 px-3 flex items-center text-sm ${isDark ? 'text-blue-200' : 'text-purple-500'} hover:underline`}
                                >{shown ? "hide" : "show"}</button>
                            </div>
                            {!isValidInput.password && <span className='text-red-500'>{inputErrorText.password}</span>}
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
                                    value={inputData.confirmPassword}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setInputData((prev) => ({ ...prev, confirmPassword: value }));
                                    }}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                {!isValidInput.confirmPassword && <span className='text-red-500'>{inputErrorText.confirmPassword}</span>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="button-gradient w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:!bg-green-700  focus:outline-none transition-all duration-300"
                            >
                                {loading ? <LoadingSpinner /> : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {
                showPopup && (
                    <div
                        onClick={() => closePupup()}
                        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#ddc9fb] p-6 min-w-80 rounded-lg shadow-lg border-2 border-red-500"
                        >
                            {showAuthPopup && <h2 className="text-lg font-bold mb-4">Signup Failed</h2>}
                            <p className="mb-4">{showAuthPopup ? ("User already exist.") : (showInputPopup ? ("Invalid inputs. Please try again.") : null)}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => closePupup()}
                                    className="bg-violet-300 hover:bg-violet-400  border-indigo-400 text-black px-4 py-2 rounded"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default SignUp;