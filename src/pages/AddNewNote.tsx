import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
// import { insertTag } from '../services/tagsService';
// import { type Tag } from '../types/Types';
import useAddTag from '../hooks/useAddTag';
import useAddNote from '../hooks/useAddNote';
import type { Note } from '../types/Types';
import useTagDetails from '../hooks/useTagDetails';


export default function AddNewNote() {

    // console.log("Rendered")

    const { isDark } = useTheme()
    const { user } = useAuth()
    const { loading, hadleAddNote } = useAddNote()
    const { tag, error, loading: loadingTagName } = useTagDetails()
    const [currentTag, setCurrentTag] = useState()
    const [currentTagTitle, setCurrentTagTitle] = useState()
    // const navigate = useNavigate()

    useEffect(() => {
        setCurrentTag(tag)
        if (tag) {
            setCurrentTagTitle(tag[0].title)
        }
    }, [tag])
    // console.log("current tag", currentTag)
    // console.log("tag id:", currentTagTitle)


    // console.log(user?.id)
    const userId = (user?.id + "")
    const { tagId } = useParams() as { tagId: string };

    const colorOptions = [
        '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3',
        '#33FFF3', '#8A2BE2', '#FF7F50', '#6495ED', '#DC143C'
    ];
    const [backgroundColor, setBackgroundColor] = useState<string>('#FF5733');
    const handleColorSelect = (color: string) => {
        setBackgroundColor(color);
    };

    const titleRef = useRef<HTMLInputElement>(null)
    const BodyRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

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

    };



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
                                Note title
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    ref={titleRef}
                                    required
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
                                    // onChange={handleDescription}
                                    // value={description}
                                    required
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
        </div>
    );
}