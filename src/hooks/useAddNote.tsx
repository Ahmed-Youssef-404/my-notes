import { useState } from 'react'
import type { Note } from '../types/Types'
import { insertNote } from '../services/notesService'

const useAddNote = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const hadleAddNote = async (note: Note) => {
        try {
            setLoading(true)
            await insertNote(note)
            console.log("Note added:", note)
            alert("Note added successfully")
        } catch (error) {
            setError(true)
            console.log("Error in useAddTag:", error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return (
        {
            loading, error, hadleAddNote
        }
    )
}

export default useAddNote
