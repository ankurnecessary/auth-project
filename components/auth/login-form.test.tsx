import { act, fireEvent, render, screen } from '@testing-library/react';
import { LoginForm } from '@/components/auth/login-form';
import '@testing-library/jest-dom';

describe('LoginForm component', () => {
  it('renders the LoginForm with CardWrapper and correct props', () => {
    render(<LoginForm />);

    // Check if the CardWrapper header label is "Welcome back"
    const headerLabel = screen.getByText('Welcome back');
    expect(headerLabel).toBeInTheDocument();

    // Check if the back button is rendered with the correct label and href
    const backButtonElement = screen.getByRole('link', {
      name: "Don't have an account?",
    });
    expect(backButtonElement).toBeInTheDocument();
    expect(backButtonElement).toHaveAttribute('href', '/auth/register');

    // Check if the login form content is rendered
    const emailField = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordField = screen.getByLabelText(/password/i);
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
  });

  it('renders the Social component within CardWrapper', () => {
    render(<LoginForm />);

    // Check that the Social component is not rendered
    const socialComponent = screen.queryByTestId('social-component');
    expect(socialComponent).toBeInTheDocument();
  });

  it('renders validation errors', async () => {
    render(<LoginForm />);
    await act(async () => {
      fireEvent.input(screen.getByLabelText(/email/i), {
        target: { value: '' },
      });
      fireEvent.input(screen.getByLabelText('Password'), {
        target: { value: '' },
      });
    });

    fireEvent.submit(screen.getByRole('button', { name: /login$/i }));

    expect(
      await screen.findByText(/Please enter a valid email address./i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/^Password is required/i),
    ).toBeInTheDocument();
  });
});
