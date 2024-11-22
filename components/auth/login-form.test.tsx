import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { LoginForm } from '@/components/auth/login-form';
import '@testing-library/jest-dom';
import { login } from '@/actions/login';

// Mocking login function
jest.mock('@/actions/login', () => ({
  login: jest.fn(),
}));

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

  it('should show error message on failed login', async () => {
    const mockLogin = login as jest.Mock;
    mockLogin.mockResolvedValueOnce({
      error: 'Invalid credentials',
    });

    render(<LoginForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('jhon.doe@example.com'), {
      target: { value: 'jhon.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('******'), {
      target: { value: 'wrongpassword' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the login function to be called and for the error message to appear
    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'jhon.doe@example.com',
        password: 'wrongpassword',
      }),
    );

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('should disable inputs and button during form submission', async () => {
    const mockLogin = login as jest.Mock;

    // Mock the login function to simulate a delay and successful response
    mockLogin.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ success: 'Success' }), 1000),
        ),
    ); // Simulate delay

    render(<LoginForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('jhon.doe@example.com'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('******'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Wait for the inputs and button to be disabled after form submission starts
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('jhon.doe@example.com'),
      ).toBeDisabled();
      expect(screen.getByPlaceholderText('******')).toBeDisabled();
      expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    });

    // Wait for the submission to complete and check if they are enabled again
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('jhon.doe@example.com'),
      ).not.toBeDisabled();
      expect(screen.getByPlaceholderText('******')).not.toBeDisabled();
      expect(screen.getByRole('button', { name: /login/i })).not.toBeDisabled();
    });
  });
});
