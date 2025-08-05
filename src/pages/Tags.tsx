import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import tinycolor from 'tinycolor2'
import useGetTags from '../hooks/useGetTags'
import useTheme from '../hooks/useTheme'
import { type Tag } from '../types/Types'


const Tags = () => {

    const { user } = useAuth()
    const { isDark } = useTheme()
    const { error, getAllTags, loading } = useGetTags()
    const navigate = useNavigate()
    const [tags, setTags] = useState<Tag[]>([])

    useEffect(() => {
        const fetchTags = async () => {
            const allTags = await getAllTags()
            if (allTags) {
                setTags(allTags)
            }
        }

        fetchTags();
    }, [])


    // console.log("there is an error",error)


    if (loading) {
        return (
            <div className="flex justify-center mt-28 h-screen">
                <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
            </div>
        )
    }

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

    if (!loading && tags && tags.length === 0) {
        return (
            <section className="py-16 pt-0 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                            You don't have any tags
                        </h3>
                        <button onClick={() => navigate("/newtag")} className="mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Add new Tag
                        </button>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-16 pt-0 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                            Something went wrong
                        </h3>
                    </div>
                </div>
            </section>
        )
    }


    return (
        <>
            <h3 className="flex justify-around items-center flex-col md:flex-row gap-2 text-2xl md:text-3xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
                <span>Here are all your <span style={{ color: 'var(--logo-note)' }}>Tags</span></span>
                <span className='text-2xl md:text-3xl'>Number of Tags: <span style={{ color: 'var(--logo-note)' }}>{tags.length}</span></span>
            </h3>
            <hr className=' text-[#ffa6f8] ' />
            <div className="mx-auto text-center mt-8">
                <button onClick={() => navigate("/newtag")} className=" button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Add new Tag
                </button>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
                {tags && tags.sort().map((tag) => (
                    <Link to={tag.tag_id + ''} key={tag.tag_id} className="size-hover p-6 rounded-xl border border-[#00012f] hover:shadow-md transition-all" style={{ background: `${tag.backgroutd_color}` }}>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(tag.backgroutd_color) }}>
                            {tag.title}
                        </h3>

                        <p style={{ color: getTextColor(tag.backgroutd_color) }}>
                            {tag.description.length > 15 ? tag.description.slice(0, 15) + "..." : tag.description}
                        </p>
                    </Link>
                ))}
            </div>
        </>
    )
}


export default Tags

