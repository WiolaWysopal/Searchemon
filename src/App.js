import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonDetails from "./components/PokemonDetails";
import axios from "./axios";

function App() {
  const [search, setSearch] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [ourPokemon, setOurPokemon] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [showList, setShowList] = useState(false);
  const limit = 10; // Wyświetla 10 pokemonów - w miarę przewijania będzie infinite scroll
  const maxLimit = 100;

  const fetchPokemon = async (pokemonName) => {
    try {
      const res = await axios.get(`/pokemon/${pokemonName}`);
      setOurPokemon(res.data);
    } catch (e) {
      setOurPokemon(null);
      console.error("Error", e);
    } finally {
      setHasSearched(true);
    }
  };

  const fetchPokemonList = async (pageNum) => {
    const offset = (pageNum - 1) * limit;
    if (offset >= maxLimit) return;
    setIsFetching(true);
    try {
      const res = await axios.get(`/pokemon?limit=${limit}&offset=${offset}`);
      const detailedList = await Promise.all(
        res.data.results.map(p => axios.get(p.url).then(res => res.data))
      );
      setPokemonList(prev => [...prev, ...detailedList]);
    } catch (e) {
      console.error("Error fetching list", e);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (showList) {
      fetchPokemonList(page);
    }
  }, [page, showList]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !isFetching && showList && pokemonList.length < maxLimit
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching, showList, pokemonList]);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowList(false);
    setPokemonList([]);
    fetchPokemon(search.toLowerCase());
  };

  const handleShowList = () => {
    setHasSearched(false);
    setShowList(true);
    setOurPokemon(null);
    setPokemonList([]);
    setPage(1);
  };

  return (
    <div className="App">
      <SearchBar
        onSearchChange={handleSearchChange}
        searchValue={search}
        onSearchSubmit={handleSearchSubmit}
      />
      <button onClick={handleShowList} style={{ marginTop: '1em' }}>
        Show full list
      </button>

      {hasSearched && (
        ourPokemon ? (
          <PokemonDetails pokemon={ourPokemon} />
        ) : (
          <div className="not-found">
            <p>There's no such pokemon</p>
            <img src="/images/wowpikachu.png" alt="Wow Pikachu" />
          </div>
        )
      )}

      {showList && (
        <div style={{ marginTop: '2em' }}>
          <h2>Pokemon List</h2>
          {pokemonList.map(p => (
            <PokemonDetails key={p.name} pokemon={p} />
          ))}
          {isFetching && <p>Loading more...</p>}
        </div>
      )}
    </div>
  );
}

export default App;
