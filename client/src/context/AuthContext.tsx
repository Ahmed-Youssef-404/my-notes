import { createContext, useEffect, useState, type ReactNode } from "react"
import supabase from "../lib/supabaseClient"
import getUserService from "../services/getUserService"
// import { type userTypes } from "../types/Types"

export type AuthContextType = {
    userId: string | null
    setUserId: (id: string | null) => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [userId, setUserId] = useState<string | null>(null)

    const getLogedUser = async () => {
        const id = await getUserService()
        if (id) {
            setUserId(id)
        }
    }
    
    useEffect(() => {
        getLogedUser()
    }, [])

    return (
        <AuthContext.Provider value={{ userId: userId, setUserId: setUserId }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
