import { useState } from "react"
import { editTag } from "../services/tagsService";
import type { Tag } from "../types/Types";


const useEditTag = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleEditTag = async (tag: Tag, tag_id: string) => {

        try {
            setLoading(true)
            await editTag(tag, tag_id)
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
            loading, error, handleEditTag
        }
    )
}

export default useEditTag
