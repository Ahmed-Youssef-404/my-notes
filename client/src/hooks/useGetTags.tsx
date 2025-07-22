import { useEffect, useState } from 'react'
import { type Tag } from '../types/Types'
import { useAuth } from './useAuth'
import { getTags } from '../services/tagsService'
import { getDataFromLocalStorage } from '../utils'


const useGetTags = () => {

    const userData = getDataFromLocalStorage()
    const userId = (userData?.id+"")
    // console.log(userData?.id)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const { user } = useAuth()
    // const userId = (user?.id + "")

    const getAllTags = async () => {
        try {
            setLoading(true)
            const allTags = await getTags(userId)
            // console.log(allTags)t
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
