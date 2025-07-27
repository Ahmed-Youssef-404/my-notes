import { useState } from "react"
import { deleteTagService } from "../services/tagsService"

const useDeleteTag = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const deleteTag = async (tag_id: string) => {
        try {
            setLoading(true)
            await deleteTagService(tag_id)
        } catch (error) {
            setError(true)
            console.log("error deleting tag", error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, deleteTag, error
    }
}

export default useDeleteTag
