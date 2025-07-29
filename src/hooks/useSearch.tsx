import { useState } from "react";
import { searchService } from "../services/searchService";
import { string } from "yup";
import type { Note, Tag } from "../types/Types";


export const useSearch = () => {
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false)
    const [error, setError] = useState(false);
    const [data, setData] = useState<Note[] | Tag[] | null>()

    const handleSearch = async (searchFor: string, text: string) => {
        try {
            setLoading(true)
            setNotFound(false)
            const comingData = await searchService(searchFor, text)
            if (comingData) {
                setData(comingData)
                setNotFound(false)
                return comingData
            } else {
                setData([])
                setNotFound(true)
                return null
            }
            setError(false)
        } catch (error) {
            setError(true)
            console.log("Error in search hook:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, notFound, error, data, handleSearch
    }


}