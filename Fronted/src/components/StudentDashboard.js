import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useContext(useAuth);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/students/${user.id}/bookings`);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookings();
  }, [user.id]);

  return (
    <div>
      <h1>Dashboard de Estudiante</h1>
      <h2>Mis Reservas</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>{booking}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
