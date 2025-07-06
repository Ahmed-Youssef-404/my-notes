import { createContext, useEffect, useState } from "react";
import { type ReactNode } from "react"

type theme = "light" | "dark";
type ThemeContextType = {
    theme: theme,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    let theTheme: theme = 'light'
    if (localStorage.getItem('theme') === 'dark') {
        theTheme = 'dark'
    }
    //  else (
    //     theTheme = 'light'
    // )
    const [theme, setTheme] = useState<theme>(theTheme)
    const toggleTheme = (() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    })

    localStorage.setItem('theme', theme)

    useEffect(() => {
        const bodyClassList = document.body.classList
        bodyClassList.remove(theme === "light" ? "dark" : "light")
        bodyClassList.add(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }} >
            {children}
        </ThemeContext.Provider >
    )
}