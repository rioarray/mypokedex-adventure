import React from 'react';
import { Tag } from 'antd';
import pokemonType from 'helpers/pokemon-type';

export const PokemonTypes = ({ data }) => {
  const element = data.types.map((value, index) =>
    <Tag key={index} className="pokemon-types" color={pokemonType[value.type.name]}>
      {value.type.name}
    </Tag>
  );
  return element;
};

export default PokemonTypes;
