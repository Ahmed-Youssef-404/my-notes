import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import type { Note } from "../types/Types"
import { getSingleNote } from "../services/singleNoteService"

const useNoteDetails = () => {
    const { noteId } = useParams<{ noteId: string }>()

    const [note, setNote] = useState<Note[] | null>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                setLoading(true)
                const res = await getSingleNote(noteId + "")
                setNote(res)
                if (error) {
                    setError(true)
                    console.error("Error fetching the note", error)
                }
            } catch (err) {
                console.error("Error fetching the note", err)
                setError(true)
                setNote(null)
            } finally {
                setLoading(false)
            }
        }
        if (noteId) fetchTagDetails()
    }, [noteId])

    return {
        note: note,
        error,
        loading
    }
}

export default useNoteDetails


// setTag(res && Array.isArray(res) ? res[0] ?? null : null)


