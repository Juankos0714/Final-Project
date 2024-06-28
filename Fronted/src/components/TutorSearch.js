import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TutorSearch.css'; 

const tutors = [
  { id: 1, name: 'Juan Pérez', subject: 'Matemáticas', modality: 'virtual', degree: 'pregrado' },
  { id: 2, name: 'Ana Gómez', subject: 'Física', modality: 'presencial', degree: 'maestría' },
  { id: 3, name: 'Pedro Ruiz', subject: 'Química', modality: 'virtual', degree: 'doctorado' },
  
]

const TutorSearch = () => {
  const [filters, setFilters] = useState({
    subject: '',
    modality: '',
    degree: '',
  });

  const [filteredTutors, setFilteredTutors] = useState(tutors);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const { subject, modality, degree } = filters;
    const results = tutors.filter(tutor => 
      (subject ? tutor.subject.toLowerCase().includes(subject.toLowerCase()) : true) &&
      (modality ? tutor.modality === modality : true) &&
      (degree ? tutor.degree === degree : true)
    );
    setFilteredTutors(results);
  };

  return (
    <Container className="tutor-search-container">
      <Row>
        <Col>
          <h1>Buscador de Tutores</h1>
          <Form>
            <Form.Group controlId="subject">
              <Form.Label>Materia</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Ingrese la materia" 
                name="subject" 
                value={filters.subject}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="modality">
              <Form.Label>Modalidad</Form.Label>
              <Form.Control 
                as="select" 
                name="modality" 
                value={filters.modality}
                onChange={handleInputChange}
              >
                <option value="">Seleccione la modalidad</option>
                <option value="virtual">Virtual</option>
                <option value="presencial">Presencial</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="degree">
              <Form.Label>Grado de Escolaridad</Form.Label>
              <Form.Control 
                as="select" 
                name="degree" 
                value={filters.degree}
                onChange={handleInputChange}
              >
                <option value="">Seleccione el grado de escolaridad</option>
                <option value="pregrado">Pregrado</option>
                <option value="maestría">Maestría</option>
                <option value="doctorado">Doctorado</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={handleSearch} className="mt-3">
              Buscar
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Resultados de la Búsqueda</h2>
          {filteredTutors.length > 0 ? (
            <ul className="list-group">
              {filteredTutors.map(tutor => (
                <li key={tutor.id} className="list-group-item">
                  <strong>{tutor.name}</strong> - {tutor.subject} - {tutor.modality} - {tutor.degree}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron tutores.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TutorSearch;
