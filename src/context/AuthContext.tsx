import { createContext, useEffect, useState, type ReactNode } from "react"
import { type userTypes } from "../types/Types"

export type AuthContextType = {
    user: userTypes | null
    setUser: React.Dispatch<React.SetStateAction<userTypes | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userTypes | null>(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (!(storedUser === null)) {
            console.log(storedUser)
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
