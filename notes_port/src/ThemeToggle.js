import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}>
            {theme === 'default' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        </button>
    );
};

export default ThemeToggle;