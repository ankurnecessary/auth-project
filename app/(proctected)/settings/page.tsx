'use client';
import { logout } from '@/actions/logout';
import React from 'react';

function SettingsPage() {
  const onClick = () => {
    logout();
  };
  return (
    <div className="rounded-xl bg-white p-10">
      <button onClick={onClick} type="submit">
        Sign Out
      </button>
    </div>
  );
}

export default SettingsPage;
