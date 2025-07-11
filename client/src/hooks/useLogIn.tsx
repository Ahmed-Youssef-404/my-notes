import { useState } from "react";
import { getUser } from "../services/logInService";
import type { authDataTypes } from "../types/Types";


export const useLogIn = () => {
    // const { email, password } = data;
    const [isLoading, setIsLoading] = useState(false);
    const [isLoged, setIsLoged] = useState(false);
    const [error, setError] = useState(false);

    const handleLogIn = async (data: authDataTypes) => {
        try {
            setIsLoading(true)
            await getUser(data)
            setIsLoged(true);
        } catch (error) {
            setError(false);
            throw error
        }finally{
            setIsLoading(false)
        }

        
    }
    return{
        isLoading, handleLogIn, isLoged, error
    }
}