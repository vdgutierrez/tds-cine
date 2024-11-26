import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Para hacer la solicitud POST a la API

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    email: '',
    telefono: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.102.78:8080/auth/register', {
        email: formData.email,
        password: formData.password,
        nombre: formData.nombre,
        apellido: formData.apellido,
        tlfn: formData.telefono
      });
      console.log('Usuario registrado exitosamente:', response.data);
      navigate('/'); // Redirige a la página principal después del registro
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro. Intenta nuevamente.');
    }
  };

  return (
    <Container style={{ marginTop: '5%', marginBottom: '5%' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center text-white">Datos personales</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombres">
              <Form.Label className="text-white">Nombres</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Nombres"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text"><FaUser /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formApellidos">
              <Form.Label className="text-white">Apellidos</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Apellidos"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text"><FaUser /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDireccion">
              <Form.Label className="text-white">Dirección</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Dirección"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text"><FaMapMarkerAlt /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCorreo">
              <Form.Label className="text-white">Correo</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="email"
                  placeholder="Correo"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Label className="text-white">Teléfono</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="text"
                  placeholder="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text"><FaPhone /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="text-white">Contraseña</Form.Label>
              <div className="input-group">
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span className="input-group-text"><FaLock /></span>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Guardar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
