import React from 'react';

const Header = ({ handleToggleDarkMode }) => {
    return (
        <header className='header'>
            <h1>Notes</h1>
            <button
                onClick={() => handleToggleDarkMode(prevMode => !prevMode)}
                className='toggle-mode-button'
                aria-label='Toggle Dark Mode'
            >
                Toggle Mode
            </button>
        </header>
    );
};

export default Header;
