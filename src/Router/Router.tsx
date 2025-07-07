import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomeNoUser from "../pages/HomeNoUser";
import NotFoundPage from "../pages/NotFoundPage";
import LogIn from "../pages/LogiN";
import SignUp from "../pages/SignUp";
import Logout from "../pages/Logout";





export const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomeNoUser />}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/user" element={<Logout/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="*" element={<NotFoundPage/>}/>

        </Route>
    )
)