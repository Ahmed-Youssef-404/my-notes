import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleTag } from "../services/singleTagService"

const useTagDetails = () => {
    const { tagId } = useParams<{ tagId: string }>()

    const [tag, setTag] = useState<any>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                setLoading(true)
                const res = await getSingleTag(tagId + "")
                setTag(res)
                console.log("there is an error",error)
                if (error) {
                    setError(true)
                    console.error("Error fetching the Tag", error)
                }
            } catch (err) {
                console.error("Error fetching the Tag", err)
                setError(true)
                setTag(null)
            } finally {
                setLoading(false)
            }
        }
        if (tagId) fetchTagDetails()
    }, [tagId])

    return {
        tag,
        error,
        loading
    }
}

export default useTagDetails


// setTag(res && Array.isArray(res) ? res[0] ?? null : null)