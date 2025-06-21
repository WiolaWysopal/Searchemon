import React from "react";

const SearchBar = ({onSearchChange, searchValue, onSearchSubmit}) => {
    return (
        <div>
         <input onChange = {onSearchChange} value={searchValue} placeholder="Type a pokemon..."></input>
         <button onClick={onSearchSubmit}>Search'em all!</button>
      </div>
    )
};

export default SearchBar;