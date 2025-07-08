// import { useAuth } from '../hooks/useAuth'
// import useTheme from '../hooks/useTheme'
import { Outlet } from 'react-router-dom'
import Tags from '../pages/Tags'

const TagsLayout = () => {
    // const { user } = useAuth()
    // const {isDark} = useTheme()
    return (
        <div className="add min-h-screen">
            <section className="py-20 px-4">
                <div className=" mx-auto">
                    {/* <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
                        Here are all your <span style={{ color: 'var(--logo-note)' }}>Tags</span>
                    </h3>
                    <hr className=' text-red-600 ' /> */}
                    <Outlet/>
                </div>
            </section>
        </div>
    )
}

export default TagsLayout
