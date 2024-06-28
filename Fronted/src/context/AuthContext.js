import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/auth');
          setUser(res.data);
        } catch (err) {
          console.error('Error initializing auth:', err);
          setError(err.response?.data?.message || 'Error de autenticación');
          logout();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const res = await axios.get('/api/auth');
      setUser(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      console.error('Error logging in:', err);
      setError(err.response?.data?.message || 'Error de inicio de sesión');
      logout();
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('/api/users/register', userData);
      login(res.data.token);
      return res.data;
    } catch (err) {
      console.error('Error registering:', err);
      setError(err.response?.data?.message || 'Error de registro');
      throw err;
    }
  };

  const updateUser = async (userData) => {
    try {
      const res = await axios.put('/api/users', userData);
      setUser(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.response?.data?.message || 'Error actualizando usuario');
      throw err;
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    updateUser,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };