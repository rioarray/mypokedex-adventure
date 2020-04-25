import React, { Fragment, useState } from 'react';
import { Col, List, Row, Typography } from 'antd';
import { DashboardOutlined, ColumnHeightOutlined } from '@ant-design/icons';
import { PokemonTypes } from 'components/atom/pokemon-types'
import { IconWithLabelSmall } from 'components/molecules/icon-with-label-small';
import { DetailPokemon } from './detail-pokemon';

const { Title } = Typography;

export const ListPokemon = ({ dataSource }) => {
  const [isVisibleDetail, setVisibleDetail] = useState(false);
  const [pokemonDetail, setPokemonDetail] = useState({});

  const onClickItem = (item) => {
    setVisibleDetail(true);
    setPokemonDetail(item);
  }
  const onCloseDetail = () => {
    setVisibleDetail(false);
  }
  return (
    <Fragment>
      <List
        rowKey={record => record.id}
        className="pokemon-list"
        grid={{ gutter: 24, column: 3 }}
        dataSource={dataSource}
        renderItem={item => {
          const height = item.height / 10;
          const weight = item.weight / 10;
          return (
            <List.Item onClick={() => onClickItem(item)} style={{ cursor: 'pointer' }}>
              <Row>
                <Col md={12} lg={8}>
                  <img src={item.sprites.front_default} alt="thumbnail" />
                </Col>
                <Col md={12} lg={16}>
                  <Title level={4} className="pokemon-name">{item.name}</Title>
                  <div style={{ marginBottom: '0.2em' }}>
                    <PokemonTypes data={item} />
                  </div>
                  <IconWithLabelSmall icon={<DashboardOutlined />} value={`${weight}kg`} />
                  &nbsp;&nbsp;
                  <IconWithLabelSmall icon={<ColumnHeightOutlined />} value={`${height}m`} />
                </Col>
              </Row>
            </List.Item>
          );
        }}
      />
      <DetailPokemon visible={isVisibleDetail} data={pokemonDetail} onCloseDetail={onCloseDetail} />
    </Fragment>
  );
};

export default ListPokemon;
