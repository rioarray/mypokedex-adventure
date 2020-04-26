import React from 'react';
import { render } from '@testing-library/react';
import { PokemonTypes } from 'components/atom/pokemon-types';

describe("Pokemon Types Component", () => {
  test('render pokemon types component', () => {
    const element = render(<PokemonTypes />);
    expect(element).toMatchSnapshot();
  });

  test('should render `No Data Available` if data is empty', () => {
    const { getByText } = render(<PokemonTypes data={{}} />);
    expect(getByText('No Data Available')).toBeInTheDocument();
  });
});