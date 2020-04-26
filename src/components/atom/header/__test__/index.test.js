import React from 'react';
import { render } from '@testing-library/react';
import { HeaderComponent } from 'components/atom/header/component';

describe("Header Component", () => {
  test('render header component', () => {
    const element = render(<HeaderComponent />);
    expect(element).toMatchSnapshot();
  });
});