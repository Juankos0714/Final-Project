import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const { email, password } = formData;
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email es requerido';
    if (!password) errors.password = 'Contraseña es requerida';
    return errors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');
    try {
      const res = await axios.post('/api/users/login', formData);
      await login(res.data.token);
      setSuccessMessage('Inicio de sesión exitoso');
      setTimeout(() => {
        navigate(location.state?.from?.pathname || '/', { replace: true });
      }, 2000);
    } catch (err) {
      setServerError(err.response?.data?.msg || 'Ocurrió un error durante el inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {serverError && <div className="error-message">{serverError}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email"
          name="email" 
          value={email} 
          onChange={onChange} 
          required 
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input 
          type="password" 
          id="password"
          name="password" 
          value={password} 
          onChange={onChange} 
          required 
        />
        {errors.password && <div className="error-message">{errors.password}</div>}
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default Login;