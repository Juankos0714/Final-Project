import React from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <button onClick={handleClick}>Registrarse</button>
  );
}

export default RegisterButton;