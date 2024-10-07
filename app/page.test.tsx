import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Home from './page';
// import LoginButton from '@/components/auth/login-button'; // Mocked component

// Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the LoginButton component to simulate its functionality
jest.mock('@/components/auth/login-button', () => {
  const MockLoginButton = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const handleClick = () => {
      router.push('/auth/login'); // Handle the navigation inside the click handler
    };
    return (
      <div data-testid="login-button" onClick={handleClick}>
        {children}
      </div>
    );
  };
  MockLoginButton.displayName = 'MockLoginButton';
  return MockLoginButton;
});

describe('Home Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Mock the router.push function
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush, // Mock push function
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock states after each test
  });

  it('renders main heading and description', () => {
    render(<Home />);

    // Check if the main heading is rendered
    const heading = screen.getByRole('heading', { name: /🔑 Auth/i });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-6xl font-semibold drop-shadow-md');

    // Check if the description is rendered
    const description = screen.getByText(/a simple authentication service/i);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-lg');
  });

  it('renders LoginButton with Sign in button', () => {
    render(<Home />);

    // Check if the LoginButton component is rendered with the Sign in button
    const loginButton = screen.getByTestId('login-button');
    expect(loginButton).toBeInTheDocument();

    const signInButton = screen.getByRole('button', { name: /sign in/i });
    expect(signInButton).toBeInTheDocument();
  });

  it('triggers navigation on Sign in button click', () => {
    render(<Home />);

    // Simulate click event on the Sign in button
    const signInButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(signInButton);

    // Verify that the router push method is called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });
});
