// src/components/Auth/AdminRoute.jsx
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

const ADMIN_UID = (process.env.REACT_APP_ADMIN_UID || "").trim();
const ADMIN_EMAIL = (process.env.REACT_APP_ADMIN_EMAIL || "").trim();

export default function AdminRoute({ auth }) {
  const [ready, setReady] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      const isAdmin =
        !!u && (u.uid === ADMIN_UID || (!!ADMIN_EMAIL && u.email === ADMIN_EMAIL));
      setOk(isAdmin);
      setReady(true);
    });
  }, []);

  if (!ready) return null;
  return ok ? <Outlet /> : <Navigate to="/login" replace />;
}
