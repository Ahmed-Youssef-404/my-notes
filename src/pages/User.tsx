import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import useTheme from "../hooks/useTheme";
import { clearDataInLocalStorage } from "../utils";
import signOut from "../hooks/useSignOut";
import { useAuth } from "../hooks/useAuth";
import useTagsCount from "../hooks/useTagCount";
import useUserNotesCount from "../hooks/useUserNotesCount";

const User = () => {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { setUser } = useAuth();
    const { tagCount } = useTagsCount()
    const { userNotesCount } = useUserNotesCount()
    const { loading, error, profile, handleProfile } = useProfile();

    useEffect(() => {
        if (!loading) {
            handleProfile(); 
        }
    }, []);

    const handleLogOut = async () => {
        signOut();
        clearDataInLocalStorage()
        setUser(null)
        navigate('/')
    }

    if (loading)
        return (
            <p className="text-center mt-28 text-2xl">
                <LoadingSpinner color={isDark ? "white" : "black"} height={50} />
            </p>
        );
    else if (error || !profile)
        return (
            <p className="text-center mt-28 text-red-500 text-2xl">
                Failed to load profile
            </p>
        );

    else return (
        <div className="add min-h-screen">
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <h3
                        className="text-3xl md:text-4xl font-bold mb-6 text-center"
                        style={{ color: "var(--color-text)" }}
                    >
                        Welcome back,{" "}
                        <span style={{ color: "var(--logo-note)" }}>
                            {profile?.username}
                        </span>
                    </h3>
                    <div
                        className="flex flex-col gap-4 text-2xl md:text-3xl"
                        style={{ color: "var(--logo-my)" }}
                    >
                        <p className="font-bold">
                            User Name:{" "}
                            <span
                                className="font-medium"
                                style={{ color: "var(--color-text)" }}
                            >
                                {profile?.username}
                            </span>
                        </p>
                        <p className="font-bold">
                            User ID:{" "}
                            <span
                                className="font-medium"
                                style={{ color: "var(--color-text)" }}
                            >
                                {profile?.id}
                            </span>
                        </p>
                        <p className="font-bold">
                            E-Mail:{" "}
                            <span
                                className="font-medium"
                                style={{ color: "var(--color-text)" }}
                            >
                                {profile?.email}
                            </span>
                        </p>
                        <p className="font-bold">
                            Created at:{" "}
                            <span
                                className="font-medium"
                                style={{ color: "var(--color-text)" }}
                            >
                                {new Date(profile?.created_at).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                })}
                            </span>
                        </p>
                        <p className="font-bold">
                            Number of Tags:{" "}
                            <span
                                className="font-medium"
                                style={{ color: "var(--color-text)" }}
                            >
                                {tagCount}
                            </span>
                        </p>
                        <p className="font-bold">
                            Number of Notes:{" "}
                            <span
                                className="font-medium"
                                style={{ color: "var(--color-text)" }}
                            >
                                {userNotesCount}
                            </span>
                        </p>
                    </div>
                    <button onClick={handleLogOut} className="mt-16 bg-red-400 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Log out
                    </button>
                </div>
            </section>
        </div>
    );
};

export default User;



// if (!user) {
//     return (
//     <p className="text-center mt-28 text-red-500 text-2xl">
//         You are not loged in
//     </p>
//     )
// }
