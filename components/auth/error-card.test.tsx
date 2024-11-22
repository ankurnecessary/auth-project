import { render, screen } from '@testing-library/react';
import ErrorCard from '@/components/auth/error-card';
import '@testing-library/jest-dom';

describe('Error card component', () => {
  it('should render an exclamation icon with the testid=error', () => {
    render(<ErrorCard />);
    const destructiveElement = screen.getByTestId('error');
    expect(destructiveElement).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<ErrorCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
