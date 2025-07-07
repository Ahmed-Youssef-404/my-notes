import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomeNoUser from "../pages/HomeNoUser";
import NotFoundPage from "../pages/NotFoundPage";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Logout from "../pages/Logout";
import { useAuth } from "../hooks/useAuth";
import HomeUser from "../pages/HomeUser";

// Wrapper component for conditional home rendering
function HomePage() {
    const { user } = useAuth();
    return user?.username ? <HomeUser /> : <HomeNoUser />;
}

export const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/user" element={<Logout/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Route>
    )
)

