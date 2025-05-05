import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';
import '@testing-library/jest-dom';

// Mock Journey component
jest.mock('../Journey', () => () => <div data-testid="journey-component" />);

describe('Home Component', () => {
  test('renders name and title', () => {
    render(<Home />);
    
    expect(screen.getByText(/Hi, I'm Avinash Yadav/i)).toBeInTheDocument();
    expect(screen.getByText(/Software Developer/i)).toBeInTheDocument();
    expect(
      screen.getByText(/I build exceptional and accessible digital experiences/i)
    ).toBeInTheDocument();
  });

  test('renders social icons with correct links', () => {
    render(<Home />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://github.com/yourusername');
    expect(links[1]).toHaveAttribute('href', 'https://linkedin.com/in/yourusername');
    expect(links[2]).toHaveAttribute('href', 'mailto:your.email@example.com');
  });

  test('renders Journey component', () => {
    render(<Home />);
    expect(screen.getByTestId('journey-component')).toBeInTheDocument();
  });
});
