import { RouterProvider } from "react-router-dom"
import { Router } from "./Router/Router"
import AppProvider from "./context/AppProvider"

const App = () => {
    return (
        <AppProvider>
            <RouterProvider router={Router} />
        </AppProvider>
    )
}

export default App
