import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import tinycolor from 'tinycolor2'
import useGetTags from '../hooks/useGetTags'
import useTheme from '../hooks/useTheme'


const Tags = () => {

    const { user } = useAuth()
    const { isDark } = useTheme()

    const navigate = useNavigate()

    useEffect(() => {
        if (user?.id) {
            tags
        }
    }, [user])


    if (loading) {
        return (
            <div className="flex justify-center mt-16 h-screen">
                <LoadingSpinner height={40} color={`${isDark ? 'white' : 'black'}`} />
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
                        <button onClick={()=>navigate('/login')} className="mx-4 mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Log In
                        </button>
                        <button onClick={()=>navigate('/signup')} className="mx-4 mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
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
                        <button onClick={()=>navigate("/newtag")} className="mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Add new Tags
                        </button>
                    </div>
                </div>
            </section>
        )
    }


    return (
        <>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
                Here are all your <span style={{ color: 'var(--logo-note)' }}>Tags</span>
            </h3>
            <hr className=' text-[#ffa6f8] ' />
            <div className="grid md:grid-cols-3 gap-8 my-16">
                {tags && tags.map((tag) => (
                    <Link to={tag.id + ''} key={tag.id} className="p-6 rounded-xl hover:shadow-md transition-all" style={{ background: `${tag.backgrounColor}` }}>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(tag.backgrounColor) }}>
                            {tag.tagName}
                        </h3>
                        <p style={{ color: getTextColor(tag.backgrounColor) }}>
                            {tag.tagDescripion}
                        </p>
                    </Link>
                ))}

            </div>
        </>
    )
}


export default Tags


