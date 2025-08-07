import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import useTheme from '../hooks/useTheme'
import { useEffect, useState } from 'react'
import useNoteDetails from '../hooks/useNoteDetails'
import useDeleteNote from '../hooks/useDeleteNote'
import HTMLReactParser from 'html-react-parser/lib/index'

const SingleNote = () => {
    const { note, error: detailesError, loading: loadingDetailes } = useNoteDetails()
    const { noteId } = useParams()
    const { isDark } = useTheme()
    const navigate = useNavigate()
    const { deleteNote, loading: lodingDelete } = useDeleteNote()
    // const inAddNote = location.pathname.includes("addnote");
    const [showPopup, setShowPopup] = useState(false)
    const [doneDeleting, setDoneDeleting] = useState(false)
    // const { deleteTag } = useDeleteTag()


    const handleDeleteNote = () => {
        setShowPopup(true)
        console.log(showPopup)
    }

    useEffect(() => {
        if (lodingDelete) {
            console.log("loading delete is:", lodingDelete)
            console.log("done deleting and will close and navigate")
            setDoneDeleting(true)
        }
        if (doneDeleting) {
            setShowPopup(false)
            navigate(-1)
        }
    }, [lodingDelete])


    if (loadingDetailes) {
        return (
            <div className="flex justify-center mt-28 h-screen">
                <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
            </div>
        )
    }


    if (detailesError || !note || !note[0]) {
        return (
            <div className="text-center mt-20 text-red-500 text-4xl font-bold">
                note not found!
            </div>
        )
    }

    return (
        <div>
            <section className="pt-0">
                <div className="mx-auto">{/*border-red-600 border-2*/}

                    <div className="">
                        <div className="flex flex-col md:flex-row justify-start sm:justify-around custom-justify-around flex-wrap gap-2 md:gap-8 text-xl mb-6" style={{ color: 'var(--color-text)' }}>
                            <span>Note name: <span style={{ color: 'var(--logo-note)' }}>{note[0].title}</span></span>
                            {/* <span>Note description: <span style={{ color: 'var(--logo-note)' }}>{note[0].body}</span></span> */}
                            <span>Created at: <span style={{ color: 'var(--logo-note)' }}>
                                {new Date(note[0].created_at).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </span>
                            </span>
                            <div>
                                <button onClick={() => { navigate("editnote") }} className="bg-green-600 cursor-pointer text-white mr-1 px-3 py-[1px] rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    Edit Note
                                </button>
                                <button onClick={handleDeleteNote} className="bg-red-500 cursor-pointer text-white ml-1 px-3 py-[1px] rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    Delete Note
                                </button>
                            </div>
                        </div>
                        <hr className=' text-[#ffa6f8] ' />
                    </div>

                    <div className="mx-auto mt-4">
                        <h1 className={`${isDark ? "text-white" : "text-black"} text-center font-bold text-4xl mb-4`}>{note[0].title}</h1>
                        <hr className=' text-[#8b8b8b] w-56 mx-auto mb-8' />
                        <p className={`singleNote ${isDark ? "text-white" : "text-black"} text-xl whitespace-pre-wrap w-[90%] mx-auto  border-red-400`} >
                            {/* {note[0].body} */}
                            {HTMLReactParser(note[0].body)}
                        </p>
                    </div>



                    {
                        showPopup && (
                            <div onClick={() => { setShowPopup(false) }} className="animation fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                                <div onClick={(e) => e.stopPropagation()} className="bg-[#ddc9fb] p-6 rounded-lg shadow-lg border-2 border-red-500">
                                    <h2 className="text-lg font-bold mb-4">Are You Sure?</h2>
                                    <p className="mb-4">Confirm deleting the Note?</p>
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => setShowPopup(false)}
                                            className="bg-violet-300 hover:bg-violet-400 text-black px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (noteId) {
                                                    deleteNote(noteId)
                                                }
                                            }}
                                            className="w-46 flex justify-center items-center bg-red-600 hover:bg-red-700 text-white rounded"
                                        >
                                            {lodingDelete ? <LoadingSpinner /> : "Confirm Deleting"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default SingleNote
