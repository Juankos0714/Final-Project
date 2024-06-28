import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleRoute = ({ children, roles }) => {
  const { user, loading } = useAuth(); // Usa el hook directamente
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // O cualquier componente de carga que prefieras
  }

  if (!user) {
    // Si no hay usuario, redirige al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
    // Si el usuario no tiene el rol requerido, redirige a la página principal
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;