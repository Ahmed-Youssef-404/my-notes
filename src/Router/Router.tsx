import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomeNoUser from "../pages/HomeNoUser";
import NotFoundPage from "../pages/NotFoundPage";





export const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomeNoUser />}/>
            <Route path="*" element={<NotFoundPage/>}/>

        </Route>
    )
)