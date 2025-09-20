// src/components/lib/AdminPage.jsx
import React from 'react';
import LogoutButton from './LogoutButton';
import AdminEditor from './AdminEditor';

export default function AdminPage() {
  return (
    <div>
      <header style={{ display:'flex', justifyContent:'space-between', padding:16, borderBottom:'1px solid #eee' }}>
        <h2>Admin</h2>
        <LogoutButton />
      </header>
      <AdminEditor />
    </div>
  );
}
