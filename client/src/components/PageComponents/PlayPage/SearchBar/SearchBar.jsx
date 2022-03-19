import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './search-bar.scss'

const SearchBar = ({value, setValue}) => {
    return (
        <div className='search-bar'>
            <div className="main full-block">
                <div className="seacrh-box">
                    <input type="text" placeholder='Search...' id='search-bar' autoComplete="off" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <label id='search-bar'><SearchIcon /></label>    
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
