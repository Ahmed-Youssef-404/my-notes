import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

const User = () => {
    const { user, isLoading } = useAuth()
    const navigate = useNavigate()
    const { setUser } = useAuth()

    useEffect(() => {
        if (isLoading) return 
        if (!user) {
            navigate("/")
        }
    }, [user, isLoading])

    console.log(user)

    const handleLogOut = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate('/')
    }
    return (
        <div className="add min-h-screen">
            <section className="py-20 px-4">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
                       Welcome back, <span style={{ color: 'var(--logo-note)' }}>{user?.username}</span>
                    </h3>
                    <div className="flex flex-col gap-4 text-2xl md:text-3xl" style={{ color: 'var(--logo-my)' }}>
                        <p className='font-bold'>User Name: <span className='font-medium' style={{color:'var(--color-text)'}}>{user?.username}</span></p>
                        <p className='font-bold'>User ID: <span className='font-medium' style={{color:'var(--color-text)'}}>{user?.id}</span></p>
                        <p className='font-bold'>E-Mail: <span className='font-medium' style={{color:'var(--color-text)'}}>{user?.email}</span></p>
                    </div>
                    <button onClick={handleLogOut} className="mt-16 bg-red-400 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Log out
                    </button>
                </div>
            </section>
        </div>
    )
}

export default User




