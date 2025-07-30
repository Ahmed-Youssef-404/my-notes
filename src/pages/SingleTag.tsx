import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import useTagDetails from '../hooks/useTagDetails'
import useTheme from '../hooks/useTheme'
import { useEffect, useState } from 'react'
import {useGetNotes} from '../hooks/useGetNotes'
import tinycolor from 'tinycolor2'
import type { Note } from '../types/Types'
import useTagNotesCount from '../hooks/useTagNotesCount'
import useDeleteTag from '../hooks/useDeleteTag'

const SingleTag = () => {
    const { tag, error: detailesError, loading: loadingDetailes } = useTagDetails()
    const { tagId } = useParams<{ tagId: string }>()
    const { getAllNotes, error: notesError, loading: loadingNotes } = useGetNotes()
    const { deleteTag, loading: lodingDelete } = useDeleteTag()
    const [notes, setNotes] = useState<Note[] | null>()
    const { isDark } = useTheme()
    const navigate = useNavigate()
    // const inAddNote = location.pathname.includes("addnote");
    const { tagNotesCount } = useTagNotesCount(tagId + "")
    const [showPopup, setShowPopup] = useState(false)
    const [doneDeleting, setDoneDeleting] = useState(false)

    useEffect(() => {
        if (tagId) {
            const fetchNotes = async () => {
                const allNotes = await getAllNotes(tagId)
                if (allNotes) {
                    setNotes(allNotes)
                }
            }
            fetchNotes()
        }
    }, [])

    const handleDeleteTag = () => {
        setShowPopup(true)
        console.log(showPopup)
    }

    // console.log("global loading delete is:", lodingDelete)

    useEffect(() => {
        if (lodingDelete) {
            console.log("loading delete is:", lodingDelete)
            console.log("done deleting and will close and navigate")
            setDoneDeleting(true)
        }
        if (doneDeleting) {
            setShowPopup(false)
            navigate("../")
        }
    }, [lodingDelete])



    if (loadingDetailes) {
        return (
            <div className="flex justify-center mt-28 h-screen">
                <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
            </div>
        )
    }

    if (!tag) {
        return
    }

    if (detailesError || !tag[0]) {
        return (
            <div className="text-center mt-20 text-red-500 text-xl font-bold">
                Tag not found!
            </div>
        )
    }

    const getTextColor = (bgColor: string) => {
        return tinycolor(bgColor).isLight() ? 'black' : 'white'
    }

    return (
        <div>
            <section className="pt-0">
                <div className="mx-auto">{/*border-red-600 border-2*/}

                    <div className="">
                        <div className="flex flex-col md:flex-row justify-start sm:justify-around custom-justify-around flex-wrap gap-2 md:gap-8 text-xl mb-6" style={{ color: 'var(--color-text)' }}>
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
                            <span>Number of notes: <span style={{ color: 'var(--logo-note)' }}>{tagNotesCount}</span></span>
                            <div>
                                <button onClick={() => { navigate("edittag") }} className="bg-green-600 cursor-pointer text-white mr-1 px-3 py-[1px] rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    Edit Tag
                                </button>
                                <button onClick={handleDeleteTag} className="bg-red-500 cursor-pointer text-white ml-1 px-3 py-[1px] rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                    Delete Tag
                                </button>
                            </div>
                        </div>
                        <hr className=' text-[#ffa6f8] ' />
                    </div>

                    {/* <div className="mx-auto text-center">
                        <p className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                        </p>
                    </div> */}

                    <div className="mx-auto text-center mt-8">
                        <button onClick={() => navigate("addnote")} className=" button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Add new Note
                        </button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {loadingNotes ? (
                            <div className="flex justify-center mt-28 h-screen">
                                <LoadingSpinner height={40} color={`${isDark ? 'white' : 'black'}`} />
                            </div>
                        ) : notes && notes.length > 0 ? (
                            [...notes].reverse().map((note) => (
                                <Link
                                    to={`/notes/${note.note_id}`}
                                    key={note.note_id}
                                    className="size-hover p-6 rounded-xl border border-[#00012f] hover:shadow-md transition-all"
                                    style={{ background: `${note.background_color}` }}
                                >
                                    <p
                                        className="text-xl font-semibold mb-2"
                                        style={{ color: getTextColor(note.background_color) }}
                                    >
                                        {note.title}
                                    </p>
                                    <p style={{ color: getTextColor(note.background_color) }}>
                                        {note.body.length > 15 ? note.body.slice(0, 15) + "..." : note.body}
                                    </p>
                                </Link>
                            ))
                        ) : notesError ? (
                            <h3 className="text-3xl md:text-3xl text-center text-red-600 font-bold mb-6 col-span-full">
                                <span>Error get Notes</span>
                            </h3>
                        ) : (
                            <h3 className="text-3xl md:text-3xl text-center font-bold mt-6 col-span-full" style={{ color: 'var(--color-text)' }}>
                                <span>You have no Notes</span>
                            </h3>
                        )}
                    </div>

                    {
                        showPopup && (
                            <div onClick={() => { setShowPopup(false) }} className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                                <div onClick={(e) => e.stopPropagation()} className="bg-[#ddc9fb] p-6 rounded-lg shadow-lg border-2 border-red-500">
                                    <h2 className="text-lg font-bold mb-4">Are You Sure?</h2>
                                    <p className="mb-4">This will Delete the tag and all its notes</p>
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => setShowPopup(false)}
                                            className="bg-violet-300 hover:bg-violet-400 text-black px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (tagId) {
                                                    deleteTag(tagId)
                                                }
                                            }
                                            }
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
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

export default SingleTag




//     < div className = "grid md:grid-cols-3 gap-8 my-8" >
//         { notes && notes?.length !== 0 && [...notes].reverse().map((note) => (
//             loadingNotes ? (
//                 <LoadingSpinner />
//             )
//                 : (
//                     <div key={note.note_id} className="size-hover p-6 rounded-xl border border-[#00012f] hover:shadow-md transition-all" style={{ background: `${note.background_color}` }}>
//                         <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(note.background_color) }}>
//                             {note.title}
//                         </h3>
//                         {/* <p style={{ color: getTextColor(note.background_color) }}>
//                                                 {note.body}
//                                             </p> */}
//                     </div>
//                 )

//         ))}
// {
//     <div className="grid md:grid-cols-3 gap-8 my-8">
//         {notes && notes?.length == 0 ? <h1>No notes</h1> : <h1></h1>}
//     </div>
// }
//                         </ >