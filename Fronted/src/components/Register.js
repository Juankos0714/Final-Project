import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    phone: '',
    role: 'student'
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { name, lastName, email, password, city, phone, role } = formData;
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const errors = {};
    if (!name) errors.name = 'Nombre es requerido';
    if (!lastName) errors.lastName = 'Apellido es requerido';
    if (!email) errors.email = 'Email es requerido';
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email no válido';
    if (!password) errors.password = 'Contraseña es requerida';
    if (password.length < 6) errors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (!city) errors.city = 'Ciudad es requerida';
    if (!phone) errors.phone = 'Teléfono es requerido';
    return errors;
  };

  const onSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post('/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      login(res.data.token);
      setSuccessMessage('Registro exitoso');
    } catch (err) {
      setServerError(err.response?.data?.msg || 'Error en el registro');
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => navigate('/'), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, navigate]);

  return (
    <form onSubmit={onSubmit}>
      {serverError && <div style={{ color: 'red' }}>{serverError}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      <div>
        <label>Nombre</label>
        <input type="text" name="name" value={name} onChange={onChange} required />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div>
        <label>Apellido</label>
        <input type="text" name="lastName" value={lastName} onChange={onChange} required />
        {errors.lastName && <div style={{ color: 'red' }}>{errors.lastName}</div>}
      </div>
      <div>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={onChange} required />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" name="password" value={password} onChange={onChange} required />
        {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
      </div>
      <div>
        <label>Ciudad</label>
        <input type="text" name="city" value={city} onChange={onChange} required />
        {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
      </div>
      <div>
        <label>Teléfono</label>
        <input type="text" name="phone" value={phone} onChange={onChange} required />
        {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}
      </div>
      <div>
        <label>Rol</label>
        <select name="role" value={role} onChange={onChange}>
          <option value="student">Estudiante</option>
          <option value="tutor">Tutor</option>
        </select>
      </div>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;