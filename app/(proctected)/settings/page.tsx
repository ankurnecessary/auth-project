'use client';
import { logout } from '@/actions/logout';
import { useSession } from 'next-auth/react';
import React from 'react';

function SettingsPage() {
  const session = useSession();
  const onClick = () => {
    logout();
  };
  return (
    <div>
      {JSON.stringify(session)}

      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </div>
  );
}

export default SettingsPage;
