'use client';
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react';

function SettingsPage() {
  const user = useCurrentUser();
  const onClick = () => {
    logout();
  };
  return (
    <div className="rounded-xl bg-white p-10">
      {JSON.stringify(user)}
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </div>
  );
}

export default SettingsPage;
