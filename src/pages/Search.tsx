import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import tinycolor from 'tinycolor2'
import useTheme from '../hooks/useTheme'
import { type Note, type Tag } from '../types/Types'
import { useSearch } from '../hooks/useSearch'


const Search = () => {

    const { user } = useAuth()
    const { isDark } = useTheme()
    const { data, handleSearch, error, notFound, loading } = useSearch()
    const navigate = useNavigate()
    const [searchType, setSearchType] = useState<'notes' | 'tags'>('notes');
    const [localLoading, setLocalLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState<Note[] | Tag[]>([]);


    console.log("Data coming from the service", data)
    console.log("haha", localLoading)

    useEffect(() => {
        console.log("useEffect fierd")
        setLocalLoading(true)
        const handler = setTimeout(() => {
            if (searchText.trim()) {
                const fetchData = async () => {
                    const allData = await handleSearch(searchType, searchText);
                    if (allData) {
                        setResults(allData)
                    }
                }
                fetchData();
            }
            setLocalLoading(false)
        }, 500);
        return () => {
            clearTimeout(handler)
        };
    }, [searchText, searchType]);



    const getTextColor = (bgColor: string) => {
        return tinycolor(bgColor).isLight() ? 'black' : 'white'
    }

    if (!user) {
        return (
            <section className="py-16 pt-0 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                            Log In now and lunch you Ideas!
                        </h3>
                        <button onClick={() => navigate('/login')} className="mx-4 mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Log In
                        </button>
                        <button onClick={() => navigate('/signup')} className="mx-4 mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Sing Up
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    return (

        <>
            {
                <section className="py-16 px-4">
                    <div className=" mx-auto">

                        {/* search bar and drpdown */}
                        <div
                            className={`flex gap-4 justify-around px-4 max-w-6xl mx-auto my-4`}
                        >
                            <div className="relative w-full max-w-3xl">
                                <input
                                    type="search"
                                    className={`w-full px-6 py-2 rounded-md border ${isDark ? "text-white" : "text-black"} border-gray-300 focus:ring-indigo-500 focus:border-indigo-500`}
                                    name="search"
                                    placeholder={`Search for ${searchType == "notes" ? "Notes" : "Tags"}`}
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div> */}
                            </div>
                            <div className="relative w-fit">
                                <select
                                    value={searchType}
                                    onChange={(e) => {
                                        setSearchType(e.target.value as 'notes' | 'tags');
                                        setResults([]);
                                    }}

                                    className={`appearance-none px-4 py-2 pr-10 rounded-lg border text-center transition-all duration-200
                                        ${isDark
                                            ? "bg-gray-800 text-gray-100 border-gray-600 hover:border-gray-500"
                                            : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
                                        }
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                                    cursor-pointer`}
                                >
                                    <option
                                        value="notes"
                                        className={`${isDark ? "bg-gray-800 text-center leading-tight" : "bg-white text-center leading-tight"}`}
                                    >
                                        Notes
                                    </option>
                                    <option
                                        value="tags"
                                        className={`${isDark ? "bg-gray-800 text-center leading-tight" : "bg-white text-center leading-tight"}`}
                                    >
                                        Tags
                                    </option>

                                </select>

                                {/* السهم الصغير */}
                                <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <hr className=' text-[#ffa6f8] ' />

                        {
                            (loading || localLoading) ? (
                                <div className="flex justify-center mt-24">
                                    <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
                                </div>
                            ) : (
                                (notFound) ? (
                                    <section className="py-16 pt-0 px-4">
                                        <div className="max-w-6xl mx-auto">
                                            <div className="mx-auto text-center">
                                                <p className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                                                    {(searchText !== "") && `No ${searchType == "notes" ? "Notes" : "Tags"} found`}
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                ) : (
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
                                        {
                                            searchType === 'tags' ?
                                                (results && (results as Tag[]).map((tag) => (
                                                    <Link to={`/tags/${tag.tag_id}`} key={tag.tag_id} className="size-hover p-6 rounded-xl border border-[#00012f] hover:shadow-md transition-all" style={{ background: `${tag.backgroutd_color}` }}>
                                                        <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(tag.backgroutd_color) }}>
                                                            {tag.title}
                                                        </h3>

                                                        <p style={{ color: getTextColor(tag.backgroutd_color) }}>
                                                            {tag.description.length > 15 ? tag.description.slice(0, 15) + "..." : tag.description}
                                                        </p>
                                                    </Link>
                                                )))
                                                :
                                                (
                                                    results && (results as Note[]).map((note) => (
                                                        <Link
                                                            to={`/tags/${note.tag_id}/${note.note_id}`}
                                                            key={note.note_id}
                                                            className="size-hover p-6 rounded-xl border border-[#00012f] hover:shadow-md transition-all"
                                                            style={{ background: `${note.background_color}` }}
                                                        >
                                                            <p
                                                                className="text-xl font-semibold mb-2"
                                                                style={{ color: getTextColor(note.background_color) }}
                                                            >
                                                                {note.title}
                                                            </p>
                                                            <p style={{ color: getTextColor(note.background_color) }}>
                                                                {note.body.length > 15 ? note.body.slice(0, 15) + "..." : note.body}
                                                            </p>
                                                        </Link>
                                                    ))
                                                )
                                        }

                                    </div>
                                )
                            )
                        }







                    </div>
                </section >
            }
        </>
    )
}


export default Search

