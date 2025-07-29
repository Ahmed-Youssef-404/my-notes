import { useState } from "react"
import { editNote } from "../services/notesService";
import type { Note } from "../types/Types";


const useEditNote = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleEditNote = async (note: Note, note_id: string) => {

        try {
            setLoading(true)
            await editNote(note, note_id)
            console.log("Note edited:", note)
        } catch (error) {
            setError(true)
            console.log("Error in useAddNote:", error)
            throw error
        } finally {
            setLoading(false)
        }

    }
    return (
        {
            loading, error, handleEditNote
        }
    )
}

export default useEditNote
