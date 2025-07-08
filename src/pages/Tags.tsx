import React, { use, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import { type Tag } from '../types/Types'

// interface Tag {
//     id: number
//     tagName: string
//     tagDescripion: string
//     userId: number
//     backgrounColor: string
// }

const Tags = () => {
    const TAGS_URL = 'http://localhost:3001/tags'

    const { isLoading, setIsLoading, user } = useAuth()
    const { isDark } = useTheme()
    const [tags, setTags] = useState<Tag[]>([])

    const fetchTags = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`${TAGS_URL}?userId=${user?.id}`)
            const data = await res.json()
            setTags(data)
        } catch (error) {
            console.error("Error fetching the Tags", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user?.id) {
            fetchTags()
        }
    }, [user])
    
    if (isLoading) {
        return (
            <div className="flex justify-center mt-16 h-screen">
                <LoadingSpinner height={40} color='white' />
            </div>
        )
    }

    if (!isLoading && tags.length === 0) {
        return (
            <section className="py-16 pt-0 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-bold mt-16" style={{ color: 'var(--color-text)' }}>
                            You don't have any tags
                        </h3>
                        <button className="mt-16 button-gradient cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                            Add new Tags
                        </button>
                    </div>
                </div>
            </section>
        )
    }


    return (
        <>

            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
                Here are all your <span style={{ color: 'var(--logo-note)' }}>Tags</span>
            </h3>
            <hr className=' text-red-600 ' />
            <div className="grid md:grid-cols-3 gap-8 my-16">

                {
                    tags.map((tag) => (
                        <Link to={tag.id + ''} key={tag.id} className="p-6 rounded-xl hover:shadow-md transition-all" style={{ background: `${tag.backgrounColor}` }}>
                            <h3 className={`text-xl font-semibold ${isDark ? "text-purple-500" : "text-purple-800"} mb-2`}>
                                {tag.tagName}
                            </h3>
                            <p style={{ color: 'var(--color-text)' }}>
                                {tag.tagDescripion}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}


export default Tags


