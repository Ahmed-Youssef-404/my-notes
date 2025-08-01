import { createContext } from "react";
import type { User } from "@supabase/supabase-js";
// import { type userTypes } from "../types/Types"

export interface AuthContextType {
    user: User | null;
    setUser: (id: User | null) => void;
    // isLoged: boolean
    // setIsLoged: (value: boolean) => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    // isLoged: false,
    // setIsLoged: () => { }
});
