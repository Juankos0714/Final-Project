import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Importaciones de páginas y componentes
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TutorSearchPage from './pages/TutorSearchPage';
import SessionBookingPage from './pages/SessionBookingPage';
import ManageAvailability from './components/ManageAvailability';
import StudentDashboard from './components/StudentDashboard';
import TutorDashboard from './components/TutorDashboard';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <nav>
            <Link to="/register">Registrarse</Link>
            <Link to="/Login">Ingresar</Link>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<PrivateRoute><TutorSearchPage /></PrivateRoute>} />
            <Route path="/booking" element={<RoleRoute roles={['student']}><SessionBookingPage /></RoleRoute>} />
            <Route path="/manage-availability" element={<RoleRoute roles={['tutor']}><ManageAvailability /></RoleRoute>} />
            <Route path="/student-dashboard" element={<RoleRoute roles={['student']}><StudentDashboard /></RoleRoute>} />
            <Route path="/tutor-dashboard" element={<RoleRoute roles={['tutor']}><TutorDashboard /></RoleRoute>} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;