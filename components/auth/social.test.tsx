import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Social from '@/components/auth/social'; // Update the path as needed

describe('Social component', () => {
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
});
