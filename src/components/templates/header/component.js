import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

export const HeaderComponent = () => (
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
    <div className="logo" />
  </Header>
);

export default HeaderComponent;
