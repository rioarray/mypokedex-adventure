import React, { Component } from 'react';
import { Spin } from 'antd';
import { PokeApi } from 'utils/pokemon-api';
import InfiniteScroll from 'react-infinite-scroller';
import { getQueryParamsFromUrl } from 'utils/get-query-string-from-url';
import ListPokemon from './component/list-pokemon';

export class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      hasMoreItem: true,
      limit: 27,
      offset: 0,
    };

    this.fetchPokemonList = this.fetchPokemonList.bind(this);
  }
  fetchPokemonList() {
    const { pokemonList, limit, offset } = this.state;
    const parameter = { limit, offset };

    PokeApi.getPokemonsList(parameter)
      .then((res) => {
        const getQueryParams = getQueryParamsFromUrl(res.next);
        res.results.map((data) => {
          PokeApi.getPokemonByName(data.name)
            .then((resByName) => {
              pokemonList.push(resByName);
            });
        });
        if (res.next) {
          this.setState({
            pokemonList,
            limit: getQueryParams.limit,
            offset: getQueryParams.offset,
          });
        } else {
          this.setState({ hasMoreItem: false });
        }
      });
  }
  render() {
    const { pokemonList, hasMoreItem } = this.state;
    const loader = <div className="loader"><Spin tip="Loading..." /></div>;

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.fetchPokemonList}
        hasMore={hasMoreItem}
        loader={loader}
      >
        <ListPokemon dataSource={pokemonList} />
      </InfiniteScroll>
    );
  };
};

export default PokemonList;
