import React from 'react';
import { Layout } from 'antd';
import { Header } from 'components/atom/header';

const { Content } = Layout;

export const LayoutComponent = (props) => (
  <Layout>
    <Content style={{ padding: '0 70px' }}>
      <div id="pokemon-page-wrapper" style={{ padding: 25 }}>
        <Header />
        {props.children}
      </div>
    </Content>
  </Layout>
);

export default LayoutComponent;
