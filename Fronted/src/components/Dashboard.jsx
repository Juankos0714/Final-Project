import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/user/info');
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar la información del usuario');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h1>Bienvenido, {user.name}</h1>
      {userInfo && (
        <div className="user-info">
          <h2>Tu información</h2>
          <p>Email: {userInfo.email}</p>
          <p>Rol: {userInfo.role}</p>
          {}
        </div>
      )}
      <div className="dashboard-actions">
        <h2>Acciones rápidas</h2>
        {user.role === 'student' && (
          <div>
            <button>Buscar tutores</button>
            <button>Ver mis clases</button>
          </div>
        )}
        {user.role === 'tutor' && (
          <div>
            <button>Gestionar disponibilidad</button>
            <button>Ver mis estudiantes</button>
          </div>
        )}
      </div>
      {}
    </div>
  );
};

export default Dashboard;