import { useEffect, useState } from 'react'
import { type Tag } from '../types/Types'
import { useAuth } from './useAuth'
import { getTags } from '../services/tagsService'


const useGetTags = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { user } = useAuth()
    const userId = (user?.id + "")

    const getAllTags = async () => {
        try {
            setLoading(true)
            const allTags = await getTags(userId)
            console.log(allTags)
            return allTags
        } catch (error) {
            setError(true)
            console.log("error in useGetTags", error)
        } finally {
            setLoading(false)
        }
        
    }

    return { error, loading,  getAllTags }
}

export default useGetTags
