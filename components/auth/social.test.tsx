import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Social from '@/components/auth/social';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

describe('Social component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('renders the Social component with two buttons', () => {
    render(<Social />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
  });

  it('renders the button with the icons', () => {
    const { container } = render(<Social />);

    // Check if Google button renders with icon
    const icon = container.querySelector('button > svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-5 w-5');
  });

  it('applies correct classNames to the buttons', () => {
    render(<Social />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveClass('w-full');
      expect(button).toHaveClass('border'); // assuming outline variant applies 'outline' class
    });
  });

  it('matches snapshot when label is provided', () => {
    const { asFragment } = render(<Social />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call signIn with "google" provider on Google button click', () => {
    render(<Social />);

    // Click on the Google button
    fireEvent.click(screen.getByTitle('Continue with google'));

    // Check if signIn was called with the correct provider and callbackUrl
    expect(signIn).toHaveBeenCalledWith('google', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  });

  it('should call signIn with "github" provider on GitHub button click', () => {
    render(<Social />);

    // Click on the GitHub button
    fireEvent.click(screen.getByTitle('Continue with github'));

    // Check if signIn was called with the correct provider and callbackUrl
    expect(signIn).toHaveBeenCalledWith('github', {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  });
});
