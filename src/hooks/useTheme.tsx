import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("Error loading the theme");
    // const { isDark } = context;
    // return isDark;
    return context
}

export default useTheme