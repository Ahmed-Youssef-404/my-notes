import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import useTagDetails from '../hooks/useTagDetails'
import useTheme from '../hooks/useTheme'
import { useEffect, useState } from 'react'
import useGetNotes from '../hooks/useGetNotes'
import tinycolor from 'tinycolor2'
import type { Note } from '../types/Types'

const SingleTag = () => {
    const { tag, error: detailesError, loading: loadingDetailes } = useTagDetails()
    const { getAllNotes, error: notesError, loading: loadingNotes } = useGetNotes()
    const [notes, setNotes] = useState<Note[] | null>()
    const { isDark } = useTheme()
    const navigate = useNavigate()
    const inAddNote = location.pathname.includes("addnote");
    const { tagId } = useParams<{ tagId: string }>()

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

    // console.log("Notes are:", notes)

    // console.log("tag from SingleTag.tsx", tag)
    // console.log("error", error)


    if (loadingDetailes) {
        return (
            <div className="flex justify-center mt-28 h-screen">
                <LoadingSpinner height={50} color={`${isDark ? 'white' : 'black'}`} />
            </div>
        )
    }

    if (detailesError || !tag) {
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
                    {!inAddNote &&
                        <div className="">
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
                        </div>
                    }
                    {/* <div className="mx-auto text-center">
                        <p className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                        </p>
                    </div> */}
                    {
                        !inAddNote &&
                        <div className="mx-auto text-center mt-8">
                            <button onClick={() => navigate("addnote")} className=" button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                                Add new Note
                            </button>
                        </div>
                    }

                    {
                        !inAddNote &&
                        <div className="grid md:grid-cols-3 gap-8 my-8">
                            {notes && notes.map((note) => (
                                <div key={note.note_id} className="size-hover p-6 rounded-xl border border-[#00012f] hover:shadow-md transition-all" style={{ background: `${note.background_color}` }}>
                                    <h3 className="text-xl font-semibold mb-2" style={{ color: getTextColor(note.background_color) }}>
                                        {note.title}
                                    </h3>
                                    {/* <p style={{ color: getTextColor(note.background_color) }}>
                                        {note.body}
                                    </p> */}
                                </div>
                            ))}
                        </div>

                    }

                </div>
            </section>
            <Outlet />
        </div>
    )
}

export default SingleTag
