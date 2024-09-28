import React from 'react';
import CardWrapper from './card-wrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerlabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
};
