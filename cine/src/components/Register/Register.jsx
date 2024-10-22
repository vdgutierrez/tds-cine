import React from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para registrar al usuario
    navigate('/'); // Redirige a la página principal después del registro
  };

  return (
    <Container style={{ marginTop: '5%', marginBottom: '5%' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center text-white">Datos personales</h1> {/* Texto en blanco */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombres">
              <Form.Label className="text-white">Nombres</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="text" placeholder="Nombres" required />
                <span className="input-group-text"><FaUser /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formApellidos">
              <Form.Label className="text-white">Apellidos</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="text" placeholder="Apellidos" required />
                <span className="input-group-text"><FaUser /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDireccion">
              <Form.Label className="text-white">Dirección</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="text" placeholder="Dirección" required />
                <span className="input-group-text"><FaMapMarkerAlt /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCorreo">
              <Form.Label className="text-white">Correo</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="email" placeholder="Correo" required />
                <span className="input-group-text"><FaEnvelope /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTelefono">
              <Form.Label className="text-white">Teléfono</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="text" placeholder="Teléfono" required />
                <span className="input-group-text"><FaPhone /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label className="text-white">Contraseña</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="password" placeholder="Contraseña" required />
                <span className="input-group-text"><FaLock /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDepartamento">
              <Form.Label className="text-white">Departamento</Form.Label> {/* Label en blanco */}
              <Form.Select aria-label="Departamento">
                <option value="1">La Paz</option>
                <option value="2">Santa Cruz</option>
                <option value="3">Cochabamba</option>
              </Form.Select>
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
