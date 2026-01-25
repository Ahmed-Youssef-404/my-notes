const Footer: React.FC = () => {
    return (
        <footer className="py-8 px-4 bg-gray-900 text-white relative bottom-0 w-full">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Logo */}
                <div className="text-xl font-bold">
                    My<span className="text-blue-400">Notes</span>
                </div>

                {/* Developer Info & Links */}
                <div className="text-center text-sm text-gray-400 space-y-1">
                    <p>
                        Developed by{" "}
                        {/* <span className="text-gray-200 font-medium">Ahmed Youssef</span> */}
                        <a
                            href="https://ahmed-youssef-protfolio.netlify.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-200 hover:underline font-medium transition-colors"
                        >
                            Ahmed Youssef
                        </a>
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/ahmed-youssef-37732b2b6"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/Ahmed-Youssef-404"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-200 transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:ahmed.youssef.5522.52@gmail.com"
                            className="hover:text-red-400 transition-colors"
                        >
                            Gmail
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} MyNotes.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
