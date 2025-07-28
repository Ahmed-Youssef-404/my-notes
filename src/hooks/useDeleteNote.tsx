import { useState } from "react"
import { deleteNoteService } from "../services/notesService"

const useDeleteNote = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const deleteNote = async (note_id: string) => {
        try {
            setLoading(true)
            await deleteNoteService(note_id)
        } catch (error) {
            setError(true)
            console.log("error deleting note", error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, deleteNote, error
    }
}

export default useDeleteNote


