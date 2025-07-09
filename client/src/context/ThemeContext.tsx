import { createContext, useEffect, useState } from "react";
import { type ReactNode } from "react"

type isDark = boolean | null;
type ThemeContextType = {
    isDark: isDark,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const locatStoragTheme = localStorage.getItem('isDark') === 'true'
    const IsTheThemeDark = locatStoragTheme ? true : false

    const [isDark, setIsDark] = useState<isDark>(IsTheThemeDark)
    const toggleTheme = (() => {
        setIsDark(!isDark)
    })

    localStorage.setItem('isDark', isDark + '')

    useEffect(() => {
        const bodyClassList = document.body.classList
        bodyClassList.remove(isDark ? "light" : "dark")
        bodyClassList.add(isDark ? "dark" : "light")
    }, [isDark])

    return (
        <ThemeContext.Provider value={{ isDark: isDark, toggleTheme }} >
            {children}
        </ThemeContext.Provider >
    )
}