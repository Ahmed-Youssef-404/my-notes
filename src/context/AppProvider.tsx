import { type ReactNode } from 'react'
import { ThemeProvider } from './ThemeContext'

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </>
    )
}

export default AppProvider
