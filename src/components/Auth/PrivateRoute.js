// components/Auth/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ user }) => {
  // replace with real auth state, e.g. from Firebase listener
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
