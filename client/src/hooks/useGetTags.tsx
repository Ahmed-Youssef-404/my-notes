import { useEffect, useState } from 'react'
import { type Tag } from '../types/Types'
import { useAuth } from './useAuth'



const useGetTags = () => {
    // const TAGS_URL = 'http://localhost:3001/tags'

    // const { user } = useAuth()
    // const [tags, setTags] = useState<Tag[] | null>([])
    // const [loading, setIsLoading] = useState(false)
    // const [error, setError] = useState(false)
    // useEffect(() => {

    //     const fetchTags = async () => {
    //         try {
    //             setIsLoading(true)
    //             const res = await fetch(`${TAGS_URL}?userId=${user?.id}`)
    //             if (!res.ok) throw new Error("Failed to get tags")
    //             const data = await res.json()
    //             setTags(data)
    //             setError(false)
    //         } catch (error) {
    //             setError(true)
    //             setTags(null)
    //             console.error("Error fetching the Tags", error)
    //         } finally {
    //             setIsLoading(false)
    //         }
    //     }
    //     if (user) {
    //         fetchTags()
    //     }
    // }, [user])
    // return (
    //     {
    //         error,
    //         tags,
    //         loading
    //     }
    // )
}

export default useGetTags
