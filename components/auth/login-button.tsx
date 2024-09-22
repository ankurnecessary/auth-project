'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

function LoginButton({
  children,
  mode = 'redirect',
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // eslint-disable-next-line no-unused-vars
  asChild,
}: LoginButtonProps) {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return <span>TODO: Modal implementation</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LoginButton;
