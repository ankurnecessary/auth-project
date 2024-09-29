import { render, screen } from '@testing-library/react';
import { FormError } from '@/components/form-error'; // Adjust the path accordingly
import '@testing-library/jest-dom';

describe('FormError component', () => {
  it('renders the error message when message prop is provided', () => {
    const errorMessage = 'This is an error message';

    render(<FormError message={errorMessage} />);

    // Check if the error message is displayed
    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('renders the ExclamationTriangleIcon when message is provided', () => {
    const errorMessage = 'Error occurred';

    render(<FormError message={errorMessage} />);

    // Check if the icon is rendered
    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('does not render anything when message prop is not provided', () => {
    const { container } = render(<FormError />);

    // Check that nothing is rendered when no message is passed
    expect(container.firstChild).toBeNull();
  });

  it('matches snapshot when message is provided', () => {
    const { asFragment } = render(<FormError message="Snapshot error" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
