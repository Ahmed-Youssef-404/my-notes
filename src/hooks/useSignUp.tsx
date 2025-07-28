import { useState } from "react";
import type { NewUser } from "../types/Types";
import { insertUser } from "../services/signUpService";
import { useAuth } from "./useAuth";
import { saveDataInLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [signupErrorCount, setSignupErrorCount] = useState(0);
    const { setUser } = useAuth();
    const navigate = useNavigate()

    const handleSignUp = async (data: NewUser) => {
        try {
            setLoading(true);
            const incomingData = await insertUser(data)
            if (incomingData) {
                console.log("savig data in local storage after signup: ", incomingData)
                setUser(incomingData)
                saveDataInLocalStorage(incomingData);
                setError(false)
                navigate('/')
            } else {
                setSignupErrorCount((prev => prev + 1))
                setError(true)
            }
        } catch (error) {
            setError(true)
            throw error
        } finally {
            setLoading(false)
        }

    }

    return {
        loading, handleSignUp, isError: error, signupErrorCount

    }
}   