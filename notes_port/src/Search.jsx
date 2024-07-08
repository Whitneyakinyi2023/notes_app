import React from 'react';
import { MdSearch } from 'react-icons/md';
import './Search.css';

const Search = ({ handleSearchNote }) => {
    return (
        <div className='search-container'>
            <MdSearch className='search-icon' size='1.5em' aria-label="Search icon" />
            <input
                className='search-input'
                onChange={(event) => handleSearchNote(event.target.value)}
                type='text'
                placeholder='Type to search...'
                aria-label='Search notes'
            />
        </div>
    );
};

export default Search;