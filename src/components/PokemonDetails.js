import React, {useState, useEffect} from "react";
import axios from "axios";

const PokemonDetails = ({ pokemon }) => {
  if (!pokemon) return null;
  console.log(pokemon);

  return (
    <div>
      <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
      <p>Name: {pokemon.name}</p>
      <p>Type: {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <p>Height: {pokemon.height / 10} m</p>
      <p>Weight: {pokemon.weight / 10} kg</p>
    </div>
  );
};

export default PokemonDetails;