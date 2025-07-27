import { type FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import { useLogIn } from '../hooks/useLogIn';
import LoadingSpinner from '../components/LoadingSpinner';
import { type authDataTypes } from '../types/Types';
import { emailSchema, passwordSchema } from '../validators/validationSchemas';


const LogIn = () => {
    const navigate = useNavigate()
    // const { isLoading, setIsLoading, user, setUser } = useAuth()

    const { isDark } = useTheme()

    const { isLoading, handleLogIn, error, loginErrorCount } = useLogIn()
    const [showAuthPopup, setShowAuthPopup] = useState(false)
    const [showInputPopup, setShowInputPopup] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        if (error) {
            setShowPopup(true)
            setShowAuthPopup(true);
        } else {
            setShowPopup(false)
            setShowAuthPopup(false);
        }
    }, [loginErrorCount]);


    // console.log("Error from component", error)


    const [data, setData] = useState<authDataTypes>({
        email: "",
        password: ""
    })
    const [isValidInput, setIsValidInput] = useState({
        email: false,
        password: false
    })
    const [inputErrorText, setInputErrorText] = useState({
        email: "",
        password: ""
    })

    const [shown, setShown] = useState(false)




    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!Object.values(isValidInput).every(Boolean)) {
                // alert('Please make sure all fields are valid');
                setShowPopup(true)
                setShowInputPopup(true)
                console.log(isValidInput);
                return;
            }
            await handleLogIn(data)
            // console.log(data)
        } catch (error) {
            console.log("error in login " + error)
        }
    };

    const handleEmailChange = (text: string) => {
        try {
            emailSchema.validateSync(text)
            setInputErrorText({ ...inputErrorText, email: "" })
            setIsValidInput({ ...isValidInput, email: true })
        } catch (error: any) {
            setInputErrorText({ ...inputErrorText, email: error.message })
            setIsValidInput({ ...isValidInput, email: false })
        }
    }

    const handlePasswordChange = (text: string) => {
        try {
            passwordSchema.validateSync(text)
            setInputErrorText({ ...inputErrorText, password: "" })
            setIsValidInput({ ...isValidInput, password: true })
        } catch (error: any) {
            setInputErrorText({ ...inputErrorText, password: error.message })
            setIsValidInput({ ...isValidInput, password: false })
        }
    }


    return (

        <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300`} style={{ background: 'var(--color-bg)' }}>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className={`mt-6 text-center text-3xl font-extrabold`} style={{ color: 'var(--color-text)' }}>
                    Log in to your account
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
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setData({ ...data, email: value });
                                        handleEmailChange(value)
                                    }}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                            {!isValidInput.email && <span className='text-red-500'>{inputErrorText.email}</span>}
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
                                    value={data.password}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setData({ ...data, password: value });
                                        handlePasswordChange(value)
                                    }}
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                                <button
                                    type="button"
                                    // ref={togglePasswordRef}
                                    onClick={() => { setShown((prev) => !prev) }}
                                    className={`absolute inset-y-0 right-0 px-3 flex items-center text-sm ${isDark ? 'text-blue-200' : 'text-purple-500'} hover:underline`}
                                >{shown ? "Hide" : "Show"}</button>
                            </div>
                            {!isValidInput.password && <span className='text-red-500'>{inputErrorText.password}</span>}
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
            </div >
            {
                showPopup && (
                    <div
                        onClick={() => setShowPopup(false)}
                        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#ddc9fb] p-6 rounded-lg shadow-lg border-2 border-red-500 "
                        >
                            {showAuthPopup && <h2 className="text-lg font-bold mb-4">Login Failed</h2>}
                            <p className="mb-4">{showAuthPopup ? ("Email or password is incorrect. Please try again.") : (showInputPopup ? ("Invalid inputs. Please try again.") : null)}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="bg-violet-300 hover:bg-violet-400  border-indigo-400 text-black px-4 py-2 rounded"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default LogIn;






// if (user) {
//     return (
//         <div className="add text-white min-h-screen" style={{ background: 'var(--color-bg)' }}>
//         <section className="py-20 px-4 text-center">
//             <div className="max-w-4xl mx-auto">
//                 <h3 className="text-3xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
//                     <span>You are already loged in as </span><span style={{ color: 'var(--logo-note)' }}>{user?.username}</span>
//                 </h3>
//                 {/* bg-gradient-to-r from-purple-600 to-blue-500  */}
//                 <button onClick={() => navigate('*')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
//                     Show your Tags
//                 </button>
//             </div>
//         </section>
//     </div>
//     )
// }





 {
                // showInputPopup && (
                //     <div
                //         onClick={() => setShowInputPopup(false)}
                //         className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                //     >
                //         <div
                //             onClick={(e) => e.stopPropagation()}
                //             className="bg-[#ddc9fb] p-6 rounded-lg shadow-lg border-2 border-red-500"
                //         >
                //             {/* <h2 className="text-lg font-bold mb-4">Login Failed</h2> */}
                //             <p className="mb-4">Invalid inputs. Please try again.</p>
                //             <div className="flex justify-center gap-4">
                //                 <button
                //                     onClick={() => setShowInputPopup(false)}
                //                     className="bg-violet-300 hover:bg-violet-400ؤ text-black px-4 py-2 rounded"
                //                 >
                //                     OK
                //                 </button>
                //             </div>
                //         </div>
                //     </div>
                // )
            }