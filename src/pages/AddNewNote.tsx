import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
// import { insertTag } from '../services/tagsService';
// import { type Tag } from '../types/Types';
import useAddNote from '../hooks/useAddNote';
import type { Note } from '../types/Types';
import useTagDetails from '../hooks/useTagDetails';


export default function AddNewNote() {

    // console.log("Rendered")

    const { isDark } = useTheme()
    const { user } = useAuth()
    const { loading, hadleAddNote, error } = useAddNote()
    const { tag, loading: loadingTagName } = useTagDetails()
    const navigate = useNavigate()
    const [inputError, setInputError] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [successfulSubmit, setSuccessfulSubmit] = useState(false)
    const [currentTagTitle, setCurrentTagTitle] = useState("")
    const [titleLength, setTitleLength] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    // const navigate = useNavigate()

    useEffect(() => {
        // setCurrentTag(tag)
        if (tag) {
            setCurrentTagTitle(tag[0].title)
        }
    }, [tag])

    useEffect(() => {
        console.log("useEffect fiered")
        if (!loading) {
            if (successfulSubmit) {
                setShowPopup(true)
            }
        }
    }, [loading, successfulSubmit])


    const userId = (user?.id + "")
    const { tagId } = useParams() as { tagId: string };

    const colorOptions = [
        '#E07B5A', '#7FD58A', '#6C80E0', '#D3D97A', '#D97ACD',
        '#78D8D2', '#A070E0', '#d5e3f0', '#c7c7c7', '#C05C6E'
    ];
    const [backgroundColor, setBackgroundColor] = useState<string>('#E07B5A');
    const handleColorSelect = (color: string) => {
        setBackgroundColor(color);
    };

    const titleRef = useRef<HTMLInputElement>(null)
    const BodyRef = useRef<HTMLTextAreaElement>(null)

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.length <= 15) {
            setTitle(value);
            setTitleLength(value.length);
        } else {
            // ممكن كمان تمنع الزيادة حتى لو لزق نص كبير مرة واحدة
            const trimmed = value.slice(0, 15);
            setTitle(trimmed);
            setTitleLength(15);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (titleRef.current?.value.trim() == "" || BodyRef.current?.value.trim() == "") {
            setInputError(true)
            setShowPopup(true)
            return
        }

        const title = titleRef.current!.value || '';
        const body = BodyRef.current!.value || '';

        const newNote: Note = {
            user_id: userId,
            tag_id: tagId,
            title: title,
            body: body,
            background_color: backgroundColor,

        };
        // console.log("Note submitted:", newNote)
        hadleAddNote(newNote)
        if (!error) {
            setSuccessfulSubmit(true)
        }

    };

    const closePupup = () => {
        setShowPopup(false)
        setInputError(false)
        !inputError && navigate(`/tags/${tagId}`)
    }



    return (
        <div
            className={`flex flex-col justify-center pt-2 sm:px-6 lg:px-8 transition-colors duration-300`}
            style={{ background: isDark ? 'var(--color-bg-dark)' : 'var(--color-bg)' }}
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className={`mt-6 text-center text-3xl font-extrabold`} style={{ color: 'var(--color-text)' }}>
                    Add New Note
                </h2>
                <p className={`flex justify-center items-center gap-2 mt-2 text-center text-lg`} style={{ color: isDark ? 'var(--color-text-light)' : 'var(--color-text-light)' }}>
                    in Tag: {' '}
                    <span
                        className={`font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}
                    >
                        {loadingTagName ? <LoadingSpinner height={15} color={`${isDark ? '#c27af7' : '#9810fa'}`} /> : currentTagTitle}
                    </span>
                </p>
            </div>

            <div className="mt-8 px-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div
                    className={`${isDark ? 'bg-gray-800/70' : 'bg-[#957cae4b]'} py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 transition-colors duration-300 ${isDark ? 'border border-gray-700' : ''}`}
                >
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Note title (max 15 chars)
                                <span className="ml-1 text-xs text-gray-500">
                                    {titleLength}/15
                                </span>
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    ref={titleRef}
                                    onChange={handleTitle}
                                    value={title}
                                    // required
                                    className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="description" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Body
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={7}
                                    ref={BodyRef}
                                    // required
                                    className={`resize-none appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Background Color
                            </label>

                            <div className="mt-2 flex flex-wrap gap-2 items-center">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleColorSelect(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 ${backgroundColor === color ? (isDark ? 'border-white' : 'border-black') : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                        aria-label={`Select color ${color}`}
                                    />
                                ))}

                                <label htmlFor="custom-color" className="relative cursor-pointer">
                                    <div
                                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition hover:scale-110 ${isDark ? 'border-gray-500 text-gray-300' : 'border-gray-400 text-gray-700'}`}
                                    >
                                        +
                                    </div>
                                    <input
                                        type="color"
                                        id="custom-color"
                                        value={backgroundColor}
                                        className="absolute opacity-0 w-0 h-0"
                                        onChange={(e) => handleColorSelect(e.target.value)}
                                    />
                                </label>
                            </div>

                            {/* اللون المختار */}
                            <div className="mt-3 flex items-center">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Selected:
                                </span>
                                <div
                                    className="ml-2 w-6 h-6 rounded border"
                                    style={{
                                        backgroundColor: backgroundColor,
                                        borderColor: isDark ? '#4B5563' : '#D1D5DB'
                                    }}
                                />
                                <span className={`ml-2 text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-700'}`}>
                                    {backgroundColor}
                                </span>
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="button-gradient w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:!bg-green-700 focus:outline-none transition-all duration-300"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <LoadingSpinner />
                                    </span>
                                ) : "Add Note"}
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
                            className={`bg-[#ddc9fb] p-6 rounded-lg shadow-lg border-2 ${inputError ? "border-red-500" : "border-green-500"}`}
                        >
                            {inputError && <h2 className="text-lg font-bold mb-4">Sumbitting Failed</h2>}
                            <p className="mb-4">{inputError ? ("Pleas fill all fileds with valid data.") : ("Note submited succesfully.")}</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => {
                                        closePupup()
                                    }}
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
}