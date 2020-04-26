import React from 'react';
import { isEmpty } from 'lodash';
import { Tag } from 'antd';
import pokemonType from 'helpers/pokemon-type';

export const PokemonTypes = ({ data }) => {
  let element = 'No Data Available';
  if (!isEmpty(data) && data.types.length > 0) {
    element = data.types.map((value, index) =>
      <Tag key={index} className="pokemon-types" color={pokemonType[value.type.name]}>
        {value.type.name}
      </Tag>
    );
  }
  return element;
};

export default PokemonTypes;
