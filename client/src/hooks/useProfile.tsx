import { useEffect, useState } from "react";
import { profileDetailes } from "../services/profileService";
import type { userProfile } from "../types/Types";
import { useAuth } from "./useAuth";

export const useProfile = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [profile, setProfile] = useState<userProfile | null>(null); // هنا هنخزن الداتا
    const { user } = useAuth();

    const handleProfile = async () => {
        try {
            if (!user?.id) return;
            setLoading(true);
            const data = await profileDetailes(user?.id);
            setProfile(data); // خزن الداتا
        } catch (error) {
            console.log("❌ Error get user profile:", error);
            setError(true);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            handleProfile();
        }
    }, [user?.id]);

    return {
        loading,
        error,
        profile,
        handleProfile,
    };
};
