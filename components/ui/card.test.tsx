import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

describe('Card components', () => {
  it('should render the Card component', () => {
    const { container } = render(<Card>Card content</Card>);
    expect(container.firstChild).toHaveClass(
      'rounded-xl border bg-card text-card-foreground shadow',
    );
    expect(container.firstChild).toHaveTextContent('Card content');
  });

  it('should apply custom className to the Card component', () => {
    const { container } = render(
      <Card className="custom-class">Card content</Card>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render the CardHeader component', () => {
    const { container } = render(<CardHeader>Header content</CardHeader>);
    expect(container.firstChild).toHaveClass('flex flex-col space-y-1.5 p-6');
    expect(container.firstChild).toHaveTextContent('Header content');
  });

  it('should apply custom className to the CardHeader component', () => {
    const { container } = render(
      <CardHeader className="custom-class">Header content</CardHeader>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render the CardTitle component', () => {
    const { container } = render(<CardTitle>Card Title</CardTitle>);
    expect(container.firstChild).toHaveClass(
      'font-semibold leading-none tracking-tight',
    );
    expect(container.firstChild).toHaveTextContent('Card Title');
  });

  it('should apply custom className to the CardTitle component', () => {
    const { container } = render(
      <CardTitle className="custom-class">Card Title</CardTitle>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render the CardDescription component', () => {
    const { container } = render(
      <CardDescription>Description content</CardDescription>,
    );
    expect(container.firstChild).toHaveClass('text-sm text-muted-foreground');
    expect(container.firstChild).toHaveTextContent('Description content');
  });

  it('should apply custom className to the CardDescription component', () => {
    const { container } = render(
      <CardDescription className="custom-class">
        Description content
      </CardDescription>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render the CardContent component', () => {
    const { container } = render(
      <CardContent>Content inside card</CardContent>,
    );
    expect(container.firstChild).toHaveClass('p-6 pt-0');
    expect(container.firstChild).toHaveTextContent('Content inside card');
  });

  it('should apply custom className to the CardContent component', () => {
    const { container } = render(
      <CardContent className="custom-class">Content inside card</CardContent>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render the CardFooter component', () => {
    const { container } = render(<CardFooter>Footer content</CardFooter>);
    expect(container.firstChild).toHaveClass('flex items-center p-6 pt-0');
    expect(container.firstChild).toHaveTextContent('Footer content');
  });

  it('should apply custom className to the CardFooter component', () => {
    const { container } = render(
      <CardFooter className="custom-class">Footer content</CardFooter>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
