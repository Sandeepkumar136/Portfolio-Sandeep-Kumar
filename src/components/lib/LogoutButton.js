// src/components/lib/LogoutButton.jsx
import React from 'react';
import { account } from '../../appwrite';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const nav = useNavigate();
  return (
    <button
      onClick={async () => {
        await account.deleteSession('current');
        nav('/bloglogin', { replace: true });
      }}
    >
      Logout
    </button>
  );
}
