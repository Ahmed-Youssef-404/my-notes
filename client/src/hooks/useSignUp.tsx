import { useState } from "react";
import type { NewUser } from "../types/Types";
import { insertUser } from "../services/signUpService";
import { useAuth } from "./useAuth";
import { saveDataInLocalStorage } from "../utils";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { setUser } = useAuth();

    const handleSignUp = async (data: NewUser) => {
        try {
            setLoading(true);
            const incomingData = await insertUser(data)
            if (incomingData) {
                console.log("savig data in local storage after signup: ", incomingData)
                setUser(incomingData)
                saveDataInLocalStorage(incomingData);
            }
        } catch (error) {
            setError(true)
            throw error
        } finally {
            setLoading(false)
        }

    }

    return {
        loading, handleSignUp, isError: error

    }
}   