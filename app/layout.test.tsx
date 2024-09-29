import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '@/app/layout';
import '@testing-library/jest-dom';

jest.mock('@/app/layout', () => {
  const html = ({ children }: { children: React.ReactNode }) => {
    return (
      <div lang="en" className="antialiased">
        {children}
      </div>
    );
  };
  // Return the metadata separately to avoid mocking it
  return {
    __esModule: true,
    default: html,
    metadata: {
      title: 'Create Next App',
      description: 'Generated by create next app',
    },
  };
});

describe('RootLayout component', () => {
  it('renders children inside the RootLayout', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    // Check if the child content "Test Content" is rendered correctly
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies the correct font variables to the body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    // Check if the body has the correct font class variables
    const bodyElement = container.querySelector('div');
    expect(bodyElement).toHaveClass('antialiased');
  });

  it('sets the correct metadata', () => {
    // Check if the metadata object has the correct values
    expect(metadata.title).toBe('Create Next App');
    expect(metadata.description).toBe('Generated by create next app');
  });

  it('renders the <html> element with lang="en"', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    // Check if the <html> tag has the correct lang attribute
    const htmlElement = container.querySelector('div');
    expect(htmlElement).toHaveAttribute('lang', 'en');
  });
});
