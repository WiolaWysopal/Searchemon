import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';
import './components/SearchBar';
import './components/PokemonCard';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import PokemonDetails from "./components/PokemonDetails";

function App() {

    const [ourPokemon, setOurPokemon] = useState([]);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [search, setSearch] = useState("");
    const [allPokemon, setAllPokemon] = useState([]);
    const [pokemonNotFound, setPokemonNotFound] = useState(false);


    const [selectedPokemon, setSelectedPokemon] = useState(null); 

    const fetchData = async () => {
    try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1000");
        setAllPokemon(res.data.results);
        setOurPokemon([]);
        setPokemonNotFound(false);
    } catch (e) {
        console.log("Error", e);
    }
};

  const fetchPokemonDetails = (pokemon) => {
    setSelectedPokemon(pokemon); // nie musisz nic fetchować, bo już masz dane
  };

    useEffect(() => {
      if (!pageLoaded) {
        fetchData();
        setPageLoaded(true);
      }
    }, [pageLoaded]); 

    const handleSearch = async (e) => {
      e.preventDefault();
      const filtered = allPokemon.filter((data) => {
        return data.name.toLowerCase().includes(search.toLowerCase());
      });

      if (filtered.length === 0) {
        setOurPokemon([]);
        setPokemonNotFound(true);
        return;
      }

        setPokemonNotFound(false);

      const details = await Promise.all(
        filtered.map(async (pokemon) => {
          try {
            const res = await axios.get(pokemon.url);
            return res.data;
          } catch (error) {
            console.error("Error fetching details for:", pokemon.name);
            return null;
          }
        })
      );

      setOurPokemon(details.filter(p => p !== null));
};



    const handleChange = (e) => {
        setSearch(e.target.value);
    };


  return (
    <div className="App">
      <SearchBar
      onSearchChange={handleChange}
      searchValue={search}
      onSearchSubmit={handleSearch}
      onReload={fetchData}
      />

      {pokemonNotFound && (
      <div className="not-found">
        <p>There's no such pokemon</p>
        <img
          src="/images/wowpikachu.png"
          alt="Wow Pikachu"
        />
      </div>
    )}

      <PokemonCard
      pokemonList={ourPokemon}
      onPokemonClick={fetchPokemonDetails}
      />

      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon} />}

    </div>
  );
}

export default App;
