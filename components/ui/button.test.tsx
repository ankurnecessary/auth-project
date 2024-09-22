import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole('button', {
      name: /submit/i,
    });

    expect(button).toBeInTheDocument();
  });
});
