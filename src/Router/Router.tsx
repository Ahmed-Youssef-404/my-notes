import { createBrowserRouter, createRoutesFromChildren, Navigate, Route, useLocation } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomeNoUser from "../pages/HomeNoUser";
import NotFoundPage from "../pages/NotFoundPage";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { useAuth } from "../hooks/useAuth";
import HomeUser from "../pages/HomeUser";
import type { ReactNode } from "react";
import User from "../pages/User";

// Wrapper component for conditional home rendering
function HomePage() {
    const { user, isLoading } = useAuth(); // assuming useAuth returns isLoading

    if (isLoading) {
        return <div className="text-white"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> Loading...</div>; // or a proper loading spinner
    }

    return user ? <HomeUser /> : <HomeNoUser />;
}

// function GuestOnlyRoute({ children }: { children: ReactNode }) {
//     const { user } = useAuth();
//     const location = useLocation();

//     if (user) {
//         // Redirect logged-in users away from auth pages to "/user"
//         return <Navigate to="/user" replace />;
//     }
//     return children;
// }


export const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={
                <LogIn />
            } />
            <Route path="/signup" element={
                <SignUp />
            } />
            <Route path="/user" element={<User />} /> {/* Renamed for clarity */}
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);

