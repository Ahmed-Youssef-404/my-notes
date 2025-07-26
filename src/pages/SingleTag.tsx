import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import useTagDetails from '../hooks/useTagDetails'
import useTheme from '../hooks/useTheme'

const SingleTag = () => {
    const { tag, error, loading } = useTagDetails()
    const { isDark } = useTheme()
    if (loading) {
        return (
            <div className="flex justify-center mt-28 h-screen">
                <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
            </div>
        )
    }


    console.log("tag from SingleTag.tsx", tag)
    console.log("error", error)

    if (error || !tag) {
        return (
            <div className="text-center mt-20 text-red-500 text-xl font-bold">
                Tag not found!
            </div>
        )
    }

    return (
        <div>
            <section className="pt-0">
                <div className="mx-auto">{/*border-red-600 border-2*/}
                    {/* <div className=""> */}
                        <p className="flex justify-start sm:justify-around custom-justify-around flex-wrap gap-2 sm:gap-8 text-xl mb-6" style={{ color: 'var(--color-text)' }}>
                            <span>Tag name: <span style={{ color: 'var(--logo-note)' }}>{tag[0].title}</span></span>
                            <span>Tag description: <span style={{ color: 'var(--logo-note)' }}>{tag[0].description}</span></span>
                            <span>Created at: <span style={{ color: 'var(--logo-note)' }}>
                                {new Date(tag[0].created_at).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </span>
                            </span>
                            <span>Number of notes: <span style={{ color: 'var(--logo-note)' }}>{tag[0].num_of_notes}</span></span>
                        </p>
                        <hr className=' text-[#ffa6f8] ' />
                    {/* </div> */}
                    {/* <div className="mx-auto text-center">
                        <p className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                        </p>
                    </div> */}
                </div>
            </section>
            <Outlet />
        </div>
    )
}

export default SingleTag
