// import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const HomeUser = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    return (
        <div className="add text-white min-h-screen" style={{ background: 'var(--color-bg)' }}>
            <section className="py-20 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--logo-my)' }}>
                        <span>Welcome, </span><span style={{ color: 'var(--logo-note)' }}>{user?.username}</span>
                    </h1>
                    <p className="text-xl mb-10" style={{ color: 'var(--color-text-light)' }}>
                        Start capturing your thoughts, organizing your ideas, and tagging your notes!                        
                    </p>
                    {/* bg-gradient-to-r from-purple-600 to-blue-500  */}
                    <button onClick={() => navigate('/tags')} className="button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Show all Tags
                    </button>
                </div>
            </section>
        </div>
    )
}

export default HomeUser
