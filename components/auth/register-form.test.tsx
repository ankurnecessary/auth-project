import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { RegisterForm } from '@/components/auth/register-form';
import { register } from '@/actions/register';
import '@testing-library/jest-dom';

// Mock the register function
jest.mock('@/actions/register', () => ({
  register: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('RegisterForm Component', () => {
  it('should submit form and show success message on successful registration', async () => {
    const mockRegister = register as jest.Mock;
    mockRegister.mockResolvedValueOnce({
      success: 'Registration successful',
    });

    render(<RegisterForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('jhon.doe@example.com'), {
      target: { value: 'jhon.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('******'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'John Doe' },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: /create an account/i }),
      );
    });

    // Wait for the register function to be called and success message to be shown
    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'jhon.doe@example.com',
        password: 'password123',
      }),
    );

    await waitFor(() =>
      expect(screen.getByText('Registration successful')).toBeInTheDocument(),
    );
  });

  it('should show error message on failed registration', async () => {
    const mockRegister = register as jest.Mock;
    mockRegister.mockResolvedValueOnce({
      error: 'Email already in use',
    });

    render(<RegisterForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('jhon.doe@example.com'), {
      target: { value: 'jhon.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('******'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'John Doe' },
    });

    // Submit the form
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: /create an account/i }),
      );
    });

    // Wait for the register function to be called and error message to appear
    await waitFor(() =>
      expect(mockRegister).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'jhon.doe@example.com',
        password: 'password123',
      }),
    );

    expect(screen.getByText('Email already in use')).toBeInTheDocument();
  });

  it('should show validation errors when required fields are missing', async () => {
    render(<RegisterForm />);

    // Submit the form without filling any fields
    await act(async () => {
      fireEvent.click(
        screen.getByRole('button', { name: /create an account/i }),
      );
    });

    // Wait for validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required./i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please enter a valid email address./i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Minimum 6 characters required./i),
      ).toBeInTheDocument();
    });

    // Ensure register function is not called
    expect(register).not.toHaveBeenCalled();
  });

  it('should disable inputs and button during form submission', async () => {
    const mockRegister = register as jest.Mock;
    mockRegister.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve({ success: 'Success' });
          }, 1000),
        ),
    ); // Simulate delay

    render(<RegisterForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('John Doe'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('jhon.doe@example.com'), {
      target: { value: 'jhon.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('******'), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /create an account/i }));

    await waitFor(() => {
      // Check if inputs and button are disabled during submission
      expect(screen.getByPlaceholderText('John Doe')).toBeDisabled();
      expect(
        screen.getByPlaceholderText('jhon.doe@example.com'),
      ).toBeDisabled();
      expect(screen.getByPlaceholderText('******')).toBeDisabled();
      expect(
        screen.getByRole('button', { name: /create an account/i }),
      ).toBeDisabled();
    });

    // Wait for the submission to complete and check if they are enabled again
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('jhon.doe@example.com'),
      ).not.toBeDisabled();
      expect(screen.getByPlaceholderText('******')).not.toBeDisabled();
      expect(
        screen.getByRole('button', { name: /create an account/i }),
      ).not.toBeDisabled();
    });
  });
});
