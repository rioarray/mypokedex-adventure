import React from 'react';
import { Layout } from 'antd';
import { Header } from 'components/templates/header';

const { Content } = Layout;

export const LayoutComponent = (props) => (
  <Layout>
    <Header />
    <Content style={{ padding: '0 70px', marginTop: 64 }}>
      <div style={{ padding: 25, minHeight: '100vh' }}>
        {props.children}
      </div>
    </Content>
  </Layout>
);

export default LayoutComponent;
