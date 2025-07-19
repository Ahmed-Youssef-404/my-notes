import { useEffect, useState } from "react";
import { profileDetailes } from "../services/profileService";
import type { userProfile } from "../types/Types";
import { useAuth } from "./useAuth";

export const useProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState<userProfile | null>(null); // هنا هنخزن الداتا
  const { user } = useAuth();

  const handleProfile = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const data = await profileDetailes(user.id);
      setProfile(data); // خزن الداتا
    } catch (error) {
      console.log("❌ Error get user profile:", error);
      setError(true);
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
