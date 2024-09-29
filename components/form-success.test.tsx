import { render, screen } from '@testing-library/react';
import { FormSuccess } from '@/components/form-success'; // Adjust the path accordingly
import '@testing-library/jest-dom';

describe('FormError component', () => {
  it('renders the success message when message prop is provided', () => {
    const successMessage = 'This is a success message';

    render(<FormSuccess message={successMessage} />);

    // Check if the error message is displayed
    const messageElement = screen.getByText(successMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it('renders the ExclamationTriangleIcon when message is provided', () => {
    const successMessage = 'Success occurred';

    render(<FormSuccess message={successMessage} />);

    // Check if the icon is rendered
    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('does not render anything when message prop is not provided', () => {
    const { container } = render(<FormSuccess />);

    // Check that nothing is rendered when no message is passed
    expect(container.firstChild).toBeNull();
  });

  it('matches snapshot when message is provided', () => {
    const { asFragment } = render(<FormSuccess message="Snapshot success" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
