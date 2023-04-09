import { render, screen } from '@testing-library/react';
import Collection1 from './Pages/CollectionsNftPages/Collection1';

test('renders learn react link', () => {
  render(<Collection1 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
