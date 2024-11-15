import { render, screen } from '@testing-library/react';
import ErrorCard from '@/components/auth/error-card';
import '@testing-library/jest-dom';

// Mock the signIn function
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('Error card component', () => {
  it('should render an exclamation icon with the testid=error', () => {
    render(<ErrorCard />);
    const destructiveElement = screen.getByTestId('error');
    expect(destructiveElement).toBeInTheDocument();
  });
});
