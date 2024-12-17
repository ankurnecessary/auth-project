import React from 'react';
import Navbar from './_components/navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const protectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 bg-sky-500">
      <Navbar />
      {children}
    </div>
  );
};

export default protectedLayout;
