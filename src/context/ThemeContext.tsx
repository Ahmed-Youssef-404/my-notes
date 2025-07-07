import { createContext, useEffect, useState } from "react";
import { type ReactNode } from "react"

type isDark = boolean | null;
type ThemeContextType = {
    isDark: isDark,
    toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    // let theTheme: isDark = null

    const locatStoragTheme = localStorage.getItem('isDark') === 'false'
    const theTheme = locatStoragTheme ? false : true

    // if () {
    // }else{
    //     theTheme = true

    // }
    const [isDark, setIsDark] = useState<isDark>(theTheme)
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