// import { useAuth } from '../hooks/useAuth'
// import useTheme from '../hooks/useTheme'
import { Outlet } from 'react-router-dom'

const NotesLayout = () => {
    // const { user } = useAuth()
    // const {isDark} = useTheme()
    return (
        <div className="add min-h-screen">
            <section className="py-20 px-4">
                <div className=" mx-auto">
                    <Outlet/>
                </div>
            </section>
        </div>
    )
}

export default NotesLayout
