import React, { Children, createContext, PropsWithChildren, ReactNode, useContext, useState } from "react";

import { lightTheme, darkTheme } from "../Style/GlobalStyle";

type ThemeType = 'light' | 'dark';

type ThemeContextProps = {
    theme: ThemeType;
    colors: typeof lightTheme;
    setTheme: (theme: ThemeType) => void;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export default function ThemeContextProvider({ children }: PropsWithChildren) {
    const [theme, setTheme] = useState<ThemeType>('light');

    const colors = theme === 'light' ? lightTheme : darkTheme;

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider 
            value={{
                theme,
                colors,
                setTheme,
                toggleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (context === undefined)
        throw new Error("useTheme must be used inside ThemeContextProvider!")

    return context;
}