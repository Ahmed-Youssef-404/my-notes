import { useState } from "react"
import { insertTag } from "../services/tagsService";
import type { Tag } from "../types/Types";


const useAddTag = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleAddTag = async (tag: Tag) => {

        try {
            setLoading(true)
            await insertTag(tag)
            console.log("Tag added:", tag)
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
            loading, error, handleAddTag
        }
    )
}

export default useAddTag
