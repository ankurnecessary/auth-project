'use client';

import React, { useEffect, useState, useTransition } from 'react';
import CardWrapper from './card-wrapper';

import * as z from 'zod';
import { newPasswordSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isMounted, setIsMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  // This ensures that the component only renders after it's mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const submitHandler = (values: z.infer<typeof newPasswordSchema>) => {
    startTransition(async () => {
      const data = await newPassword(values, token);
      setError(data?.error);
      setSuccess(data?.success);
    });
  };

  // Only render the form once the component is mounted
  if (!isMounted) {
    return null;
  }

  return (
    <CardWrapper
      headerlabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
