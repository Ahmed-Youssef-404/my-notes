import { useEffect, useState } from "react";
import { profileDetailes } from "../services/profileService";
import type { userProfile } from "../types/Types";
import { useAuth } from "./useAuth";

export const useProfile = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [profile, setProfile] = useState<userProfile | null>(null) // هنا هنخزن الداتا
    const { userId } = useAuth()

    useEffect(() => {
        if (userId) {
            handleProfile();
        }
    }, [userId]);

    const handleProfile = async () => {
        console.log("Curretn userId: ", userId)
        try {
            setLoading(true)
            const data = await profileDetailes(userId + "")
            setProfile(data) // خزن الداتا
        } catch (error) {
            console.log("❌ Error get user profile:", error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading, error, profile, handleProfile
    }
}
