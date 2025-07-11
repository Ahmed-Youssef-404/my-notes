import { useState } from "react";
import type { NewUser } from "../types/Types";
import { insertUser } from "../services/signUpService";

export const useSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSignUp = async (data: NewUser) => {
        try {
            setLoading(true);
            await insertUser(data)
        } catch (error) {
            setIsError(true)
            throw error
        } finally {
            setLoading(false)
        }

    }

    return {
        loading, handleSignUp, isError

    }
}   