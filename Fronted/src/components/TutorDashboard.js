import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const TutorDashboard = () => {
  const { user } = useContext(useAuth);
  const [sessions, setSessions] = useState([]);
  const [availability, setAvailability] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(`/api/tutors/${user.id}/sessions`);
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, [user.id]);

  const handleAvailabilityChange = (day, time) => {
    setAvailability(prevAvailability => {
      const newAvailability = { ...prevAvailability };
      if (newAvailability[day].includes(time)) {
        newAvailability[day] = newAvailability[day].filter(t => t !== time);
      } else {
        newAvailability[day].push(time);
      }
      return newAvailability;
    });
  };

  const saveAvailability = async () => {
    try {
      await axios.post(`/api/tutors/${user.id}/availability`, availability);
      alert('Disponibilidad guardada con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al guardar disponibilidad');
    }
  };

  const renderTimeSlots = day => {
    const times = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    return times.map(time => (
      <div key={time}>
        <input
          type="checkbox"
          id={`${day}-${time}`}
          name={`${day}-${time}`}
          checked={availability[day].includes(time)}
          onChange={() => handleAvailabilityChange(day, time)}
        />
        <label htmlFor={`${day}-${time}`}>{time}</label>
      </div>
    ));
  };

  return (
    <div>
      <h1>Dashboard de Tutor</h1>
      <h2>Mis Sesiones</h2>
      <ul>
        {sessions.map((session, index) => (
          <li key={index}>{session}</li>
        ))}
      </ul>
      <h2>Asignar Horas de Disponibilidad</h2>
      <form>
        {Object.keys(availability).map(day => (
          <div key={day}>
            <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
            {renderTimeSlots(day)}
          </div>
        ))}
      </form>
      <button onClick={saveAvailability}>Guardar Disponibilidad</button>
    </div>
  );
};

export default TutorDashboard;
