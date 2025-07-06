import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";





export const Router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<RootLayout/>}/>
    )
)