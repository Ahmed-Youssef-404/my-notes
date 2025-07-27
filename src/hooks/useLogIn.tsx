import { useState } from "react";
import getUser from "../services/logInService";
import type { authDataTypes } from "../types/Types";
import { useAuth } from "./useAuth";
import { saveDataInLocalStorage } from "../utils";
import { useNavigate } from "react-router-dom";

export const useLogIn = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setIsloading] = useState(false);
    const [loginErrorCount, setLoginErrorCount] = useState(0);
    //   const [isLoged, setIsLoged] = useState(false);
    const [error, setError] = useState(false);

    const handleLogIn = async (data: authDataTypes) => {
        try {
            setIsloading(true);
            const incomingData = await getUser(data);
            if (incomingData) {
                console.log("saving data in local storage & store ", incomingData);
                setUser(incomingData);
                saveDataInLocalStorage(incomingData);
                setError(false);
                navigate('/')
            } else {
                setLoginErrorCount((prev => prev + 1))
                setError(true);
            }
        } catch (err) {
            console.log("Unexpected login error:", error);
            setError(true);
            console.log("error form hook", err)
            // throw error;
        } finally {
            setIsloading(false);
        }
        console.log("error form hook", error)
    };
    return {
        isLoading: loading,
        handleLogIn,
        // isLoged,
        loginErrorCount,
        error,
    };
};
