// import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import useTags from '../hooks/useTags'
import LoadingSpinner from '../components/LoadingSpinner'
import tinycolor from 'tinycolor2'
import useTheme from '../hooks/useTheme'

const HomeUser = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const { isDark } = useTheme()
    const { tags, loading } = useTags()

    const getTextColor = (bgColor: string) => {
        return tinycolor(bgColor).isLight() ? 'black' : 'white'
    }

    return (
        <div className="add text-white min-h-screen" style={{ background: 'var(--color-bg)' }}>
            <section className="py-20 pb-0 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--logo-my)' }}>
                        <span>Welcome, </span><span style={{ color: 'var(--logo-note)' }}>{user?.username}</span>
                    </h1>
                    <p className="text-xl my-6" style={{ color: 'var(--color-text)' }}>
                        Start capturing your thoughts, organizing your ideas, and tagging your notes!
                    </p>
                    <button onClick={() => navigate('/tags')} className="button-gradient cursor-pointer text-white mb-6 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Show all Tags
                    </button>
                </div>
            </section>
            <div className="text-center pt-0 px-4">
                <p className="text-2xl" style={{ color: 'var(--color-text)' }}>
                    Your recent tags
                </p>
                {
                    loading ? <div className='mt-16'> <LoadingSpinner height={60} color={isDark ? "white" : "black"} /></div>
                        :
                        tags?.length == 0 ?
                            <section className="py-20 px-4 text-center">
                                <div className="max-w-4xl mx-auto">
                                    <h3 className="text-3xl md:text-3xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
                                        <span>You have no Tags </span>
                                    </h3>
                                    {/* bg-gradient-to-r from-purple-600 to-blue-500  */}
                                    <button onClick={() => navigate('/newtag')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                        Create new Tag
                                    </button>
                                </div>
                            </section>
                            : <div className="text-start grid md:grid-cols-3 gap-8 my-8">
                                {tags && tags.slice(-4).map((tag) => (
                                    <Link to={'/tags/' + tag.id + ''} key={tag.id} className="p-6 rounded-xl hover:shadow-md transition-all" style={{ background: `${tag.backgrounColor}` }}>
                                        <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(tag.backgrounColor) }}>
                                            {tag.tagName}
                                        </h3>
                                        <p style={{ color: getTextColor(tag.backgrounColor) }}>
                                            {tag.tagDescripion}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                }
            </div>
        </div>
    )
}

export default HomeUser
