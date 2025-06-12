import React from "react";

const PokemonCard = ({ pokemonList, onPokemonClick }) => {
  return (
    <ul>
      {pokemonList.map((pokemon, index) => (
        <li key={index} onClick={() => onPokemonClick(pokemon)}>
          <p><strong>{pokemon.name}</strong></p>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <p>Type: {pokemon.types?.map(t => t.type.name).join(", ")}</p>
          <p>Height: {pokemon.height / 10} m</p>
          <p>Weight: {pokemon.weight / 10} kg</p>
        </li>
      ))}
    </ul>
  );
};



export default PokemonCard;