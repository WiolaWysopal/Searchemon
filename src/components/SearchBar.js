import React, {useState, useEffect} from "react";
import axios from "axios";

const SearchBar = ({onSearchChange, searchValue, onSearchSubmit, onReload}) => {
    return (
        <form onSubmit={onSearchSubmit}>
         <input onChange = {onSearchChange} value={searchValue} placeholder="Type a pokemon..."></input>
         <button onClick={onSearchSubmit}>Search'em all!</button>
         <button onClick={onReload}>Reload Data!</button>
      </form>
    )
};

export default SearchBar;