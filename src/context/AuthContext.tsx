import { createContext, useEffect, useState, type ReactNode } from "react"
import { type userTypes } from "../types/Types"
// import { type authDataTypes } from "../types/Types"

export type AuthContextType = {
    user: userTypes | null
    setUser: React.Dispatch<React.SetStateAction<userTypes | null>>
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<userTypes | null>(null)
    let currentUser: string | null = null

    useEffect(() => {
        if (user) {
            console.log("user " + user.email + " is loged in")
            currentUser = user.email
            console.log("currnet user is " + currentUser)
        }

    }, [user])
    return (
        <AuthContext.Provider value={{ user, setUser }} >
            {children}
        </AuthContext.Provider >
    )
}
export default AuthProvider