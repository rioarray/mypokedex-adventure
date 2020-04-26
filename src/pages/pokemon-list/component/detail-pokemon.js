import React from 'react';
import { isEmpty } from 'lodash';
import { Col, Modal, Row, Tag, Typography } from 'antd';
import Chart from "react-apexcharts";
import { DashboardOutlined, ColumnHeightOutlined } from '@ant-design/icons';
import { PokemonTypes } from 'components/atom/pokemon-types'
import { IconWithLabelSmall } from 'components/molecules/icon-with-label-small';
import CartBarProps from 'helpers/cart-bar-props';
import noImage from 'assets/images/no-image-icon.png'

const { Title } = Typography;

export const DetailPokemon = ({ visible, data, onCloseDetail }) => {
  let element = null;

  if (!isEmpty(data)) {
    const height = data.height / 10;
    const weight = data.weight / 10;
    const statisticValue = [];
    const statisticLabel = [];

    data.stats.map((item) => {
      statisticValue.push(item.base_stat);
      statisticLabel.push(item.stat.name);

      return null;
    });

    const statistic = {
      series: [{ data: statisticValue }],
      options: {
        ...CartBarProps,
        xaxis: { categories: statisticLabel },
      },
    };
    element = (
      <Modal
        className="pokemon-detail"
        style={{ top: 20 }}
        onCancel={onCloseDetail}
        visible={visible}
        footer={null}
        width={600}
      >
        <Row>
          <Col span={10}>
            <img src={data.sprites.front_default || noImage} alt="thumbnail" width="100%" />
          </Col>
          <Col span={14}>
            <Title level={2} className="pokemon-name">{data.name}</Title>
            <div style={{ marginBottom: 8 }}>
              <div className="font-bold">Type</div>
              <PokemonTypes data={data} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <div className="font-bold">Abilities</div>
              {data.abilities && data.abilities.map((item, index) =>
                <Tag key={index} color="#108ee9" className="pokemon-types">
                  {item.ability.name}
                </Tag>
              )}
            </div>
            <Row>
              <Col span={12}>
                <div style={{ marginBottom: 8 }}>
                  <div className="font-bold">Weight</div>
                  <IconWithLabelSmall icon={<DashboardOutlined />} value={`${weight}kg`} />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 8 }}>
                  <div className="font-bold">Height</div>
                  <IconWithLabelSmall icon={<ColumnHeightOutlined />} value={`${height}m`} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <div style={{ marginBottom: 8 }}>
              <div className="font-bold">Statistic</div>
              <Chart options={statistic.options} series={statistic.series} type="bar" height={350} />
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
  return element;
};

export default DetailPokemon;
