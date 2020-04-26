import React, { Component, Fragment } from 'react';
import { BackTop, Spin } from 'antd';
import { PokeApi } from 'utils/pokemon-api';
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroller';
import { getQueryParamsFromUrl } from 'utils/get-query-string-from-url';
import ListPokemon from './component/list-pokemon';
import FilterPokemon from './component/filter-pokemon';

export class PokemonList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonList: [],
      filterData: [],
      hasMoreItem: true,
      limit: 27,
      offset: 0,
    };

    this.onChangeFilterData = this.onChangeFilterData.bind(this);
    this.fetchPokemonList = this.fetchPokemonList.bind(this);
  }
  onChangeFilterData(filterData) {
    this.setState({ filterData });
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
          return null;
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
    const { pokemonList, filterData, hasMoreItem } = this.state;
    let dataSource = pokemonList;

    const loader = <div key={uuidv4()} className="loader"><Spin tip="Loading..." /></div>;
    const dataFiltered = dataSource.filter((x) => filterData.some((y) => y === x.name));

    if (dataFiltered.length > 0) {
      dataSource = dataFiltered;
    }
    return (
      <Fragment>
        <FilterPokemon onChangeFilterData={this.onChangeFilterData} />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.fetchPokemonList}
          hasMore={hasMoreItem}
          loader={loader}
        >
          <ListPokemon dataSource={dataSource} />
        </InfiniteScroll>
        <BackTop style={{ color: '#1088e9' }} />
      </Fragment>
    );
  };
};

export default PokemonList;
