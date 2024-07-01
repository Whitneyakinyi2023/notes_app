import React, { createContext, useState, useContext, useCallback } from 'react';

// Create a context with a default value
const ThemeContext = createContext({
    theme: 'default',
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('default');

    // useCallback to memoize the toggleTheme function and prevent unnecessary re-renders
    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => (prevTheme === 'default' ? 'dark' : 'default'));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};