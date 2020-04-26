import React, { useEffect, useState } from 'react';
import { Col, Row, Select } from 'antd';
import { PokeApi } from 'utils/pokemon-api';

const { Option } = Select;

export const FilterPokemon = (props) => {
  const [pokemonType, setPokemonType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    PokeApi.getTypesList()
      .then((response) => {
        setPokemonType(response.results);
        setIsLoading(false);
      });
  }, []);

  const onChangeType = (value) => {
    PokeApi.getTypeByName(value)
      .then((response) => {
        if (response.pokemon.length > 0) {
          const arrPokemonName = response.pokemon.map((item) => {
            return item.pokemon.name;
          });
          props.onChangeFilterData(arrPokemonName);
        }
      });
  }
  return (
    <Row className="filter-pokemon">
      <Col lg={{ span: 6, offset: 18 }}>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Filter Pokemon By Type"
          onChange={onChangeType}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          loading={isLoading}
        >
          {pokemonType.map((item, index) =>
            <Option key={index} value={item.name}>
              {item.name}
            </Option>
          )}
        </Select>
      </Col>
    </Row>
  );
};

export default FilterPokemon;
