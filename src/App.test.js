import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Pet Companion login screen', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /pet companion/i })
  ).toBeInTheDocument();
});
