import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomeNoUser from "../pages/HomeNoUser";
import NotFoundPage from "../pages/NotFoundPage";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import { useAuth } from "../hooks/useAuth";
import HomeUser from "../pages/HomeUser";
import User from "../pages/User";
import TagsLayout from "../layout/TagsLayout";
import Tags from "../pages/Tags";
import SingleTag from "../pages/SingleTag";

// Wrapper component for conditional home rendering
function HomePage() {
    const { user, isLoading } = useAuth(); // assuming useAuth returns isLoading

    if (isLoading) {
        return <div className="text-white"><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /> Loading...</div>; // or a proper loading spinner
    }

    return user ? <HomeUser /> : <HomeNoUser />;
}

export const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user" element={<User />} />
            <Route path="/tags" element={<TagsLayout />}>
                <Route index element={<Tags />}/>
                <Route path=":tagId" element={<SingleTag />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Route>
    )
);

