// src/components/lib/BlogProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { account } from '../../appwrite';
import { Navigate } from 'react-router-dom';

export default function BlogProtectedRoute({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    account.get().then(
      () => setOk(true),
      () => setOk(false)
    );
  }, []);

  if (ok === null) return <div>Loading...</div>;
  if (!ok) return <Navigate to="/bloglogin" replace />;
  return <>{children}</>;
}
