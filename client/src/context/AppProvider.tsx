import { type ReactNode } from 'react'
import { ThemeProvider } from './ThemeContext'
import AuthProvider from './AuthContext'

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AuthProvider>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </AuthProvider>
        </>
    )
}

export default AppProvider
