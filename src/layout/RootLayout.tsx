import { Outlet } from "react-router"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-y-hidden overflow-x-hidden">
            <Navbar />
            <div className="flex-1 mt-1 min-h-screen" style={{ background: 'var(--color-bg)' }}>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout
