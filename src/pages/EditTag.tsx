import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import useTagDetails from '../hooks/useTagDetails';
import useEditTag from '../hooks/useEditTag';



export default function EditTAg() {
    const { isDark } = useTheme()
    const { user } = useAuth()
    const { loading, handleEditTag } = useEditTag()
    // const navigate = useNavigate()
    const { tag, error: detailesError, loading: loadingTagDetailes } = useTagDetails()
    const { tagId } = useParams<{ tagId: string }>()
    const [oldTagTitle, setOldTagTitle] = useState("")
    const [oldTagDescription, setOldTagDescription] = useState("")
    const [tagTitle, setTagTitle] = useState(oldTagTitle)
    const [tagDescription, setTagDescription] = useState<string>(oldTagDescription);
    const userId = (user?.id + "")

    const colorOptions = [
        '#E07B5A', '#7FD58A', '#6C80E0', '#D3D97A', '#D97ACD',
        '#78D8D2', '#A070E0', '#d5e3f0', '#c7c7c7', '#C05C6E'
    ];
    const [backgroundColor, setBackgroundColor] = useState<string>('#FF5733');
    const handleColorSelect = (color: string) => {
        setBackgroundColor(color);
    };


    useEffect(() => {
        if (tag && tag.length > 0) {
            setOldTagTitle(tag[0].title);
            setOldTagDescription(tag[0].description);
            setTagTitle(tag[0].title);
            setTagDescription(tag[0].description);
            setBackgroundColor(tag[0].backgroutd_color || '#FF5733');
        }
    }, [tag]);


    // console.log(oldTagTitle)

    const [deslength, setDeslength] = useState<number>(0);

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTagTitle(value)
    }

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length <= 75) {
            setTagDescription(value);
            setDeslength(value.length);
        } else {
            // ممكن كمان تمنع الزيادة حتى لو لزق نص كبير مرة واحدة
            const trimmed = value.slice(0, 75);
            setTagDescription(trimmed);
            setDeslength(75);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!tagId) {
            return
        }

        const name = tagTitle.trim();
        const description = tagDescription.trim();


        const editedTag = {
            title: name,
            description: description,
            user_id: userId,
            backgroutd_color: backgroundColor,
        };

        // setCurrentTag(newTag);
        console.log('Edited Tag:', editedTag); // طبع الجديد مش القديم

        // handleAddTag(editedTag)
        handleEditTag(editedTag, tagId)

        // navigate(`tags/ ${newTag.tag_id}`)

    };


    {

        return (

            loadingTagDetailes ? (
                <div className="flex justify-center mt-28 h-screen">
                    <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
                </div>
            ) : (
                <div
                    className={`flex flex-col justify-center py-6 transition-colors duration-300`}
                    style={{ background: isDark ? 'var(--color-bg-dark)' : 'var(--color-bg)' }}
                >
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className={`text-center text-3xl font-extrabold`} style={{ color: 'var(--color-text)' }}>
                            Edit Tag
                        </h2>
                        <p className={`mt-2 text-center text-sm`} style={{ color: isDark ? 'var(--color-text-light)' : 'var(--color-text-light)' }}>
                            Of{' '}
                            <span
                                className={`font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}
                            >
                                {oldTagTitle}
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
                                        Tag Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            onChange={handleTitle}
                                            value={tagTitle}
                                            required
                                            className={`appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Description (max 75 chars)
                                        <span className="ml-1 text-xs text-gray-500">
                                            {deslength}/75
                                        </span>
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={2}
                                            onChange={handleDescription}
                                            value={tagDescription}
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
                                        ) : "save changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

{/* <div>
                            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                Background Color
                            </label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleColorSelect(color)}
                                        className={`w-8 h-8 rounded-full border-2 ${backgroundColor === color ? (isDark ? 'border-white' : 'border-black') : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                        aria-label={`Select color ${color}`}
                                    />
                                ))}
                            </div>
                            <div className="mt-2 flex items-center">
                                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Selected:
                                </span>
                                <div
                                    className="ml-2 w-6 h-6 rounded"
                                    style={{
                                        backgroundColor: backgroundColor,
                                        borderColor: isDark ? '#4B5563' : '#D1D5DB'
                                    }}
                                />
                            </div>
                        </div> */}