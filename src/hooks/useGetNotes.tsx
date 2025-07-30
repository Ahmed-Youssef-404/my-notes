import { useState } from "react"
import { getDataFromLocalStorage } from "../utils"
import { getAllNotes, getNotes } from "../services/notesService"

export const useGetNotes = () => {
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


export const useGetAllNotes = () => {
    const [loading, setLoading] = useState(false)
    const userData = getDataFromLocalStorage()
    const userId = (userData?.id + "")
    const [error, setError] = useState(false)
    const [numOfUserNotes, setNumOfUserNotes] = useState<number>()

    const getAllUserNotes = async () => {
        try {
            setLoading(true)
            const AllNotes = await getAllNotes(userId)
            setNumOfUserNotes(AllNotes.length)
            return AllNotes
        } catch (error) {
            setError(true)
            console.log("Error get all user Notes", error);
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, error, numOfUserNotes, getAllUserNotes
    }
}

