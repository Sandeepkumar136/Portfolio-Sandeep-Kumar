// src/components/lib/auth/BlogLogin.jsx
import React, { useState } from 'react';
import { account } from '../../../appwrite';
import { useNavigate } from 'react-router-dom';

export default function BlogLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await account.createEmailPasswordSession({ email, password });
      nav('/fordev', { replace: true });
    } catch (err) {
      alert(err?.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" disabled={busy}>{busy ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  );
}
