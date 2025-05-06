import React from 'react';

const SearchBar = ({ value, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="search-bar">
    <input
      type="text"
      placeholder="Search snippets..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <button type="submit">Search</button>
  </form>
);

export default SearchBar;
