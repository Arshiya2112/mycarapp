// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  // If token exists, allow access to the route; otherwise, redirect to homepage (/)
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
