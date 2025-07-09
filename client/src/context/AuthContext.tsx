import { createContext, useEffect, useState, type ReactNode } from "react"
import { type userTypes } from "../types/Types"

export type AuthContextType = {
    user: userTypes | null
    setUser: React.Dispatch<React.SetStateAction<userTypes | null>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userTypes | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!(storedUser === null)) {
            // console.log(storedUser)
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])
    return (
        <AuthContext.Provider value={{ isLoading, setIsLoading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
