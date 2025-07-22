
const Footer = () => {
    return (
        <footer className="py-8 px-4 bg-gray-900 text-white relative bottom-0 w-full">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-xl font-bold mb-4 md:mb-0">
                    My<span className="text-blue-400">Notes</span>
                </div>
                <div className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} My Notes. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer
