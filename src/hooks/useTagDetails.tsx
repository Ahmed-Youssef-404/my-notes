import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { type Tag } from '../types/Types'

const useTagDetails = () => {
    const { tagId } = useParams<{ tagId: string }>()
    const tagID: number = Number(tagId)

    const [tag, setTag] = useState<Tag | null>(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const TAGS_URL = 'http://localhost:3001/tags'

    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${TAGS_URL}/${tagID}`)

                if (!res.ok) {
                    throw new Error("Tag not found")
                }

                const data = await res.json()
                if (!data || !data.id) throw new Error("Invalid data")
                setTag(data)
                setError(false)
                
            } catch (err) {
                // console.error("Error fetching the Tag", err)
                setError(true)
                setTag(null)
            } finally {
                setLoading(false)
            }
        }

        if (tagID) fetchTagDetails()
    }, [tagID])

    return {
        tag,
        error,
        loading
    }
}

export default useTagDetails
