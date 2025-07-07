import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Logout = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()
    const handleLogOut = () => {
        setUser(null)
        localStorage.setItem("user", null + "")
        navigate('/')
    }
    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button className='w-16 bg-red-400' onClick={handleLogOut}>Log out</button>
        </div>
    )
}

export default Logout
