'use client';
import React, { useCallback, useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import CardWrapper from '@/components/auth/card-wrapper';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const submitHandler = useCallback(() => {
    if (!token) {
      setError('Missing Token!');
      return;
    }
    newVerification(token)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token]);

  useEffect(() => {
    submitHandler();
  }, [submitHandler]);

  return (
    <CardWrapper
      headerlabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
