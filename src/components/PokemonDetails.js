import React from "react";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon || !pokemon.name || !pokemon.sprites || !pokemon.types) return null;

  return (
    <div>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Name: {pokemon.name}</p>
      <p>Type: {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p>Height: {pokemon.height / 10} m</p>
      <p>Weight: {pokemon.weight / 10} kg</p>
    </div>
  );
};

export default PokemonDetails;
