import { render, screen } from '@testing-library/react';
import BackButton from '@/components/auth/back-button'; // Adjust path accordingly
import '@testing-library/jest-dom';

describe('BackButton component', () => {
  const label = 'Go Back';
  const href = '/previous-page';

  it('renders BackButton with label and href', () => {
    render(<BackButton label={label} href={href} />);

    // Check if the button contains the label
    const linkElement = screen.getByRole('link', { name: label });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent(label);
    expect(linkElement).toHaveAttribute('href', href);
  });

  it('renders the Button component with correct classes', () => {
    render(<BackButton label={label} href={href} />);

    // Check if Button has the correct classes
    const linkElement = screen.getByRole('link', { name: label });
    expect(linkElement).toHaveClass('w-full font-normal');
  });

  it('uses the asChild prop to render Link as a child of Button', () => {
    render(<BackButton label={label} href={href} />);

    // Ensure the button contains a link
    const linkElement = screen.getByRole('link', { name: label });
    expect(linkElement).toBeInTheDocument(); // Check if Link is wrapped in a Button
  });
});
