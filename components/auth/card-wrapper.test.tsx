import { render, screen } from '@testing-library/react';
import CardWrapper from '@/components/auth/card-wrapper';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

describe('CardWrapper component', () => {
  const headerlabel = 'Welcome';
  const backButtonLabel = 'Go Back';
  const backButtonHref = '/previous-page';

  it('renders the CardWrapper with header and back button', () => {
    render(
      <CardWrapper
        headerlabel={headerlabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
      >
        <div>Child Content</div>
      </CardWrapper>,
    );

    // Check if the header label is rendered
    const headerElement = screen.getByText(headerlabel);
    expect(headerElement).toBeInTheDocument();

    // Check if the back button is rendered with the correct label and href
    const backButtonElement = screen.getByRole('link', {
      name: backButtonLabel,
    });
    expect(backButtonElement).toBeInTheDocument();
    expect(backButtonElement).toHaveAttribute('href', backButtonHref);

    // Check if the children are rendered
    const childContent = screen.getByText('Child Content');
    expect(childContent).toBeInTheDocument();
  });

  it('renders the Social component when showSocial is true', () => {
    render(
      <CardWrapper
        headerlabel={headerlabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
        showSocial={true}
      >
        <div>Child Content</div>
      </CardWrapper>,
    );

    // Check if the Social component is rendered
    const socialComponent = screen.getByTestId('social-component');
    expect(socialComponent).toBeInTheDocument();
  });

  it('does not render the Social component when showSocial is false', () => {
    render(
      <CardWrapper
        headerlabel={headerlabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
        showSocial={false}
      >
        <div>Child Content</div>
      </CardWrapper>,
    );

    // Check that the Social component is not rendered
    const socialComponent = screen.queryByTestId('social-component');
    expect(socialComponent).not.toBeInTheDocument();
  });

  it('renders the CardFooter with the BackButton component', () => {
    render(
      <CardWrapper
        headerlabel={headerlabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
      >
        <div>Child Content</div>
      </CardWrapper>,
    );

    // Check if the BackButton is rendered inside the footer
    const backButtonElement = screen.getByRole('link', {
      name: backButtonLabel,
    });
    expect(backButtonElement).toBeInTheDocument();
    expect(backButtonElement).toHaveAttribute('href', backButtonHref);
  });

  it('matches snapshot when all attributes are provided except social', () => {
    const { asFragment } = render(
      <CardWrapper
        headerlabel={headerlabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
      >
        <div>Child Content</div>
      </CardWrapper>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when all attributes are provided alongwith social', () => {
    const { asFragment } = render(
      <CardWrapper
        headerlabel={headerlabel}
        backButtonLabel={backButtonLabel}
        backButtonHref={backButtonHref}
        showSocial={true}
      >
        <div>Child Content</div>
      </CardWrapper>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
