import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

interface Tag {
    tagName: string;
    tagDescripion: string;
    backgrounColor: string;
    userId: number
}

const colorOptions = [
    '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3',
    '#33FFF3', '#8A2BE2', '#FF7F50', '#6495ED', '#DC143C'
];

export default function AddNewTag() {
    const { isDark } = useTheme()
    const { user } = useAuth()
    const userId = Number(user?.id)
    const [tag, setTag] = useState<Tag>({
        tagName: '',
        tagDescripion: '',
        backgrounColor: '#FF5733', // default color
        userId: userId
    });
    const [backgroundColor, setBackgroundColor] = useState<string>('#FF5733');




    const [isLoading, setIsLoading] = useState(false);
    const TAGS_API_URL = "http://localhost:3001/tags"

    const handleColorSelect = (color: string) => {
        setBackgroundColor(color);
    };

    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    const [deslength, setDeslength] = useState<number>(0);
    const [description, setDescription] = useState<string>(''); // محتوى الـ textarea

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;

        if (value.length <= 75) {
            setDescription(value);
            setDeslength(value.length);
        } else {
            // ممكن كمان تمنع الزيادة حتى لو لزق نص كبير مرة واحدة
            const trimmed = value.slice(0, 75);
            setDescription(trimmed);
            setDeslength(75);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const name = nameRef.current!.value || '';
        const description = descriptionRef.current!.value || '';

        const newTag = {
            tagName: name,
            tagDescripion: description,
            userId,
            backgrounColor: backgroundColor,
        };

        setTag(newTag);
        console.log('Tag submitted:', newTag); // طبع الجديد مش القديم
        setIsLoading(false);

    };



    return (
        <div
            className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300`}
            style={{ background: isDark ? 'var(--color-bg-dark)' : 'var(--color-bg)' }}
        >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className={`mt-6 text-center text-3xl font-extrabold`} style={{ color: 'var(--color-text)' }}>
                    Create a New Tag
                </h2>
                <p className={`mt-2 text-center text-sm`} style={{ color: isDark ? 'var(--color-text-light)' : 'var(--color-text-light)' }}>
                    Or{' '}
                    <Link
                        to="/tags"
                        className={`font-medium ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-500'}`}
                    >
                        view existing tags
                    </Link>
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
                                    ref={nameRef}
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
                                    ref={descriptionRef}
                                    onChange={handleDescription}
                                    value={description}
                                    required
                                    className={`resize-none appearance-none block w-full px-3 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-purple-50 text-gray-900'} rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors duration-300`}
                                />
                            </div>
                        </div>

                        <div>
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="button-gradient w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:!bg-green-700 focus:outline-none transition-all duration-300"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <LoadingSpinner />
                                    </span>
                                ) : "Create Tag"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}