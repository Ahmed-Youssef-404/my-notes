import { useEffect, useState, useCallback, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import getUserService from "../services/getUserService";
import type { User } from "@supabase/supabase-js";
import { saveDataInLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = useCallback(async () => {
        try {
            console.log("Fetching logged-in user...     AuthProvider");
            const loggedUser = await getUserService();
            if (loggedUser) {
                saveDataInLocalStorage(loggedUser);
                setUser(loggedUser);
            }
        } catch (error) {
            console.error("Failed to fetch logged-in user:", error);
        }
    }, []);

    useEffect(() => {
        console.log("firing useEffect fetchUser");
        
        fetchUser();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
