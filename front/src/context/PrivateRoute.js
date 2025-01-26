import React from "react";
import { useAuth } from './AuthContext';
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return isLoggedIn ? children : <Navigate to='/login' replace />;
};
