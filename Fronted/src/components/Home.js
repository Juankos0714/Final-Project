import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'



function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/search">Search Tutors</Link></li>
          <li><Link to="/booking">Book a Session</Link></li>
          <li><Link to="/manage-availability">Manage Availability</Link></li>
          <li><Link to="/student-dashboard">Student Dashboard</Link></li>
          <li><Link to="/tutor-dashboard">Tutor Dashboard</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
