// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Adjust the import path accordingly

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/Home" />;
  }
  return children;
};

export default ProtectedRoute;
