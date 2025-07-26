import { useState } from "react"
import { getDataFromLocalStorage } from "../utils"
import { getNotes } from "../services/notesService"

const useGetNotes = () => {
    const [loading, setLoading] = useState(false)
    const userData = getDataFromLocalStorage()
    const userId = (userData?.id + "")
    const [error, setError] = useState(false)
    const [numOfTagNotes, setNumOfTagNotes] = useState<number>()

    const getAllNotes = async (tag_id: string) => {
        try {
            setLoading(true)
            const allNotes = getNotes(userId, tag_id)
            setNumOfTagNotes((await allNotes).length)
            return allNotes
        } catch (error) {
            setError(true)
            console.log("something went wrong", error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, error, numOfTagNotes, getAllNotes
    }
}

export default useGetNotes
