import { useState } from "react";
import type { NewUser } from "../types/Types";
import { insertUser } from "../services/signUpService";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSignUp = async (data: NewUser) => {
        try {
            setLoading(true);
            await insertUser(data)
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