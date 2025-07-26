import { useEffect, useState } from 'react'
import { getTags } from '../services/tagsService'
import { getDataFromLocalStorage } from '../utils'
// import type { Tag } from '../types/Types'


const useGetTags = () => {

    const userData = getDataFromLocalStorage()
    const userId = (userData?.id + "")
    const [numOfTags, setNumOfTags] = useState<number>(0)
    // console.log(userData?.id)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getAllTags = async () => {
        try {
            setLoading(true)
            const allTags = await getTags(userId)
            // console.log("all tags:", allTags)
            // console.table(allTags)
            setNumOfTags(allTags.length)
            // console.log("num of tags", allTags.length)
            return allTags
        } catch (error) {
            setError(true)
            console.log("error in useGetTags", error)
        } finally {
            setLoading(false)
        }

    }


    return { numOfTags, error, loading, getAllTags }
}

export default useGetTags
