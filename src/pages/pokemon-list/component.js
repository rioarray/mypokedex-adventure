import React, { Component } from 'react';
import { Col, List, Row, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { PokeApi } from 'utils/pokemon-api';
import { PokemonTypes } from 'components/atom/pokemon-types'
import InfiniteScroll from 'react-infinite-scroller';
import { getQueryParamsFromUrl } from 'utils/get-query-string-from-url';

const { Title } = Typography;

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
          PokeApi.resource([`/api/v2/pokemon/${data.name}`, `/api/v2/pokemon-species/${data.name}`])
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
    const { pokemonList } = this.state;
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.fetchPokemonList}
        hasMore={this.state.hasMoreItem}
      >
        <List
          className="pokemon-list"
          grid={{ gutter: 24, column: 3 }}
          dataSource={pokemonList}
          renderItem={item => (
            <List.Item>
              <Row>
                <Col md={12} lg={8}>
                  <img src={item[0].sprites.front_default} alt="thumbnail" />
                </Col>
                <Col md={12} lg={16}>
                  <Title level={4} className="pokemon-name">{item[0].name}</Title>
                  <div style={{ marginBottom: '0.2em' }}>
                    <PokemonTypes data={item[0]} />
                  </div>
                  <div>
                    <HomeOutlined />{' '}
                    <span className="pokemon-habitat-label">
                      {item[1].habitat ? item[1].habitat.name : 'No Available'}
                    </span>
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    );
  };
};

export default PokemonList;
