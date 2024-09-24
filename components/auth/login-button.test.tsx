import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginButton from '@/components/auth/login-button';

// Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginButton Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Mock the router.push function
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush, // Mock push function
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  test('1. renders children correctly', () => {
    render(<LoginButton>Click me</LoginButton>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('2. redirects to /auth/login when clicked', () => {
    render(<LoginButton>Login</LoginButton>);

    fireEvent.click(screen.getByText('Login'));

    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });

  test('3. displays modal implementation when mode is modal', () => {
    render(<LoginButton mode="modal">Login</LoginButton>);

    expect(screen.getByText('TODO: Modal implementation')).toBeInTheDocument();

    // Ensure that router.push is not called when in modal mode
    fireEvent.click(screen.getByText('TODO: Modal implementation'));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
