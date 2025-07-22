import { Link, useNavigate } from "react-router";
import useTheme from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect, useState } from "react";
import useGetTags from "../hooks/useGetTags";
import type { Tag } from "../types/Types";
import tinycolor from "tinycolor2";

const Home = () => {

    const navigate = useNavigate()
    const { isDark } = useTheme()
    const { user } = useAuth()
    const { profile } = useProfile()
    const { getAllTags, loading } = useGetTags()
    const [tags, setTags] = useState<Tag[]>([])

    console.log("Loading:", loading)

    useEffect(() => {
        const fetchTags = async () => {
            const allTags = await getAllTags()
            if (allTags) {
                setTags(allTags)
            }
        }
        fetchTags();
    }, [])

    const getTextColor = (bgColor: string) => {
        return tinycolor(bgColor).isLight() ? 'black' : 'white'
    }


    {


        return (
            user && user.id ?
                <div className="add text-white min-h-screen" style={{ background: 'var(--color-bg)' }}>
                    <section className="py-20 pb-0 px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--logo-my)' }}>
                                <span>Welcome, </span><span style={{ color: 'var(--logo-note)' }}>{profile?.username}</span>
                            </h1>
                            <p className="text-xl my-6" style={{ color: 'var(--color-text)' }}>
                                Start capturing your thoughts, organizing your ideas, and tagging your notes!
                            </p>
                        </div>
                    </section>
                    <div className="text-center pt-0 px-4">
                        {loading ? (
                            <div className='mt-16'>
                                <LoadingSpinner height={50} color={isDark ? "white" : "black"} />
                            </div>
                        ) : tags.length > 0 ? (
                            <>
                                <p className="text-2xl" style={{ color: 'var(--color-text)' }}>
                                    Your recent tags:
                                </p>
                                <div className="m-4 mt-0 md:m-8">
                                    <div className="text-start grid md:grid-cols-3 gap-8 my-8">
                                        {tags.slice(-6).reverse().map((tag) => (
                                            <Link to={`/tags/${tag.tag_id}`} key={tag.tag_id} className="p-6 rounded-xl border-2 border-[#00012f] hover:shadow-md transition-all" style={{ background: tag.backgroutd_color }}>
                                                <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(tag.backgroutd_color) }}>
                                                    {tag.title}
                                                </h3>
                                                <p style={{ color: getTextColor(tag.backgroutd_color) }}>
                                                    {tag.description}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                    <button onClick={() => navigate('/tags')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                        Show all tags
                                    </button>
                                </div>
                            </>
                        ) : (
                            <section className="py-20 px-4 text-center">
                                <div className="max-w-4xl mx-auto">
                                    <h3 className="text-3xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                                        <span>You have no Tags </span>
                                    </h3>
                                    <button onClick={() => navigate('/newtag')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                        Create new Tag
                                    </button>
                                </div>
                            </section>
                        )}

                    </div>
                </div>
                :
                <div className="add min-h-screen" style={{ background: 'var(--color-bg)' }}>
                    {/* Hero Section */}
                    <section className="py-20 px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--logo-my)' }}>
                                <span style={{ color: 'var(--color-text)' }}>Welcome to </span> My<span style={{ color: 'var(--logo-note)' }}>Notes</span>
                            </h1>
                            <p className="text-xl mb-10" style={{ color: 'var(--color-text-light)' }}>
                                Where you can Organize your thoughts, ideas, and tasks with our simple yet powerful note-taking tool.
                                Tag, categorize, and find your notes in seconds.
                            </p>
                            {/* bg-gradient-to-r from-purple-600 to-blue-500  */}
                            <button onClick={() => navigate('*')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                Start Taking Notes
                            </button>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 pt-0 px-4">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--color-text)' }}>Why Choose My Notes?</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="p-6 rounded-xl hover:shadow-md transition-all" style={{ background: 'var(--card-color-1)' }}>
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </div>
                                    <h3 className={`text-xl font-semibold ${isDark ? "text-purple-500" : "text-purple-800"} mb-2`}>Tag System</h3>
                                    <p style={{ color: 'var(--color-text)' }}>
                                        Organize notes with custom tags and find them instantly with our powerful tagging system.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl hover:shadow-md transition-all" style={{ background: 'var(--card-color-2)' }}>
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <h3 className={`text-xl font-semibold ${isDark ? "text-blue-500" : "text-blue-800"} mb-2`}>Simple Editing</h3>
                                    <p style={{ color: 'var(--color-text)' }}>
                                        Clean, distraction-free editor with markdown support for beautiful note formatting.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl hover:shadow-md transition-all" style={{ background: 'var(--card-color-3)' }}>
                                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className={`text-xl font-semibold ${isDark ? "text-pink-500" : "text-pink-800"} mb-2`}>Instant Search</h3>
                                    <p style={{ color: 'var(--color-text)' }}>
                                        Find any note in seconds with our blazing fast search that looks through titles and content.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section bg-gradient-to-r from-blue-600 to-purple-600 */}
                    <section className="py-20 px-4 " style={{ background: 'var(--cta-background)', color: 'var(--color-text)' }}>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to organize your thoughts?</h2>
                            <p className="text-xl mb-10 opacity-90">
                                Join thousands of users who have transformed their note-taking experience.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button onClick={() => navigate('signup')} className="bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all">
                                    Sign Up Free
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}

                </div>


        );

    }
};

export default Home;