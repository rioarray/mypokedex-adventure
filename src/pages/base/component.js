import React from 'react';
import { Layout } from 'components/templates/layout';
import { PokemonList } from 'pages/pokemon-list';

export const BaseComponent = () => (
  <Layout>
    <PokemonList />
  </Layout>
);

export default BaseComponent;