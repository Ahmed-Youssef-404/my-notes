import { useNavigate } from "react-router-dom";
// import { useAuth } from '../hooks/useAuth'
import { useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import LoadingSpinner from "../components/LoadingSpinner";
import useTheme from "../hooks/useTheme";

const User = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { loading, error, profile, handleProfile } = useProfile();

  useEffect(() => {
    if (!loading) {
      handleProfile(); // هنا بننفذ الفانكشن أول ما الصفحة تفتح
    }
  }, []);

  // const handleLogOut = () => {
  //     localStorage.removeItem("user")
  //     setUser(null)
  //     navigate('/')
  // }

  if (loading)
    return (
      <p className="text-center mt-28 text-2xl">
        <LoadingSpinner color={isDark ? "white" : "black"} />
      </p>
    );
  if (error || !profile)
    return (
      <p className="text-center mt-28 text-red-500 text-2xl">
        Failed to load profile
      </p>
    );

  return (
    <div className="add min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
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
              Number of tags:{" "}
              <span
                className="font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {profile?.numOfTags}
              </span>
            </p>
            <p className="font-bold">
              Number of notes:{" "}
              <span
                className="font-medium"
                style={{ color: "var(--color-text)" }}
              >
                {profile?.numOfNotes}
              </span>
            </p>
          </div>
          {/* <button onClick={handleLogOut} className="mt-16 bg-red-400 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                        Log out
                    </button> */}
        </div>
      </section>
    </div>
  );
};

export default User;
