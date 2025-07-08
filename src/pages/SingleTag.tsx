import LoadingSpinner from '../components/LoadingSpinner'
import useTagDetails from '../hooks/useTagDetails'

const SingleTag = () => {
    const { tag, error, loading } = useTagDetails()

    if (loading) {
        return (
            <div className="flex justify-center mt-16 h-screen">
                <LoadingSpinner height={40} color="white" />
            </div>
        )
    }

    if (error || !tag) {
        return (
            <div className="text-center mt-20 text-red-500 text-xl font-bold">
                Tag not found!
            </div>
        )
    }

    return (
        <div>
            <section className="py-16 pt-0 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto text-center">
                        <p className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                            <span>{tag.tagName}</span><br />
                            <span>{tag.tagDescripion}</span>
                        </p>
                        <button className="mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Add new Tags
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SingleTag
