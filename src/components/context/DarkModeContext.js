import React, { createContext, useState, useEffect, useContext } from "react";

// Create the context
const DarkModeContext = createContext();

// Create a custom hook for accessing the context

// Create the provider
export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem("darkMode");
        return savedTheme === "true"; // Defaults to false if not set
    });

    // Update localStorage and apply the theme to the document body
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("light-mode");
        } else {
            document.body.classList.add("light-mode");
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    // Toggle the theme
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
export const useDarkMode = () => useContext(DarkModeContext);