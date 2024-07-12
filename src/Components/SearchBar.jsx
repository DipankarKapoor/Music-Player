import React from 'react';

const SearchBar = ({ onSearch }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search Song, Artist"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

export default SearchBar;
