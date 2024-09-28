import { render, screen } from '@testing-library/react';
import Header from '@/components/auth/header'; // Adjust path accordingly
import '@testing-library/jest-dom';
import { Poppins } from 'next/font/google';

describe('Header component', () => {
  const label = 'Welcome to the authentication page';

  it('renders the header with the correct label', () => {
    render(<Header label={label} />);

    // Check if the label text is rendered
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveTextContent(label);
  });

  it('renders the h1 element with correct text and icon', () => {
    render(<Header label={label} />);

    // Check if the h1 contains the correct text "🔑 Auth"
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('🔑 Auth');
  });

  it('applies the correct Poppins font class', () => {
    const { container } = render(<Header label={label} />);

    // Get the h1 element and check if it has the correct font class
    const headingElement = container.querySelector('h1');
    const fontClassName = Poppins({
      subsets: ['latin'],
      weight: ['600'],
    }).className;

    expect(headingElement).toHaveClass(fontClassName);
  });

  it('applies the correct class names to the header elements', () => {
    render(<Header label={label} />);

    // Check if the h1 element has the correct classes
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveClass('text-3xl font-semibold');

    // Check if the paragraph element has the correct classes
    const paragraphElement = screen.getByText(label);
    expect(paragraphElement).toHaveClass('text-sm text-muted-foreground');
  });
});
