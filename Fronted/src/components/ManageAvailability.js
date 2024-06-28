import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ManageAvailability = () => {
  const { user } = useContext(useAuth);
  const [availability, setAvailability] = useState([]);
  const [newAvailability, setNewAvailability] = useState('');

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(`/api/tutors/${user.id}/availability`);
        setAvailability(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvailability();
  }, [user.id]);

  const addAvailability = async () => {
    try {
      const res = await axios.post(`/api/tutors/${user.id}/availability`, { slot: newAvailability });
      setAvailability([...availability, res.data]);
      setNewAvailability('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Gestionar Disponibilidad</h1>
      <input
        type="text"
        value={newAvailability}
        onChange={(e) => setNewAvailability(e.target.value)}
        placeholder="Añadir disponibilidad"
      />
      <button onClick={addAvailability}>Añadir</button>
      <ul>
        {availability.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAvailability;
