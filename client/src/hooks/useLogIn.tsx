import { useState } from "react";
import getUser from "../services/logInService"
import type { authDataTypes } from "../types/Types";


export const useLogIn = () => {
    // const { email, password } = data;
    const [loading, setIsloading] = useState(false);
    const [isLoged, setIsLoged] = useState(false);
    const [error, setError] = useState(false);

    const handleLogIn = async (data: authDataTypes) => {
        try {
            setIsloading(true)
            await getUser(data)
            setIsLoged(true);
        } catch (error) {
            setError(false);
            throw error
        }finally{
            setIsloading(false)
        }

        
    }
    return{
        isLoading: loading, handleLogIn, isLoged, error
    }
}