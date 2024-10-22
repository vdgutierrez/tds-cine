import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para autenticación
    navigate('/'); // Redirige a la página principal tras el login
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <Container style={{ marginTop: '10%', marginBottom: '10%' }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center text-white">Iniciar sesión</h1> {/* Texto en blanco */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsuario">
              <Form.Label className="text-white">Usuario</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="text" placeholder="Usuario" required />
                <span className="input-group-text"><FaUser /></span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContraseña">
              <Form.Label className="text-white">Contraseña</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control type="password" placeholder="Contraseña" required />
                <span className="input-group-text"><FaLock /></span>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Ingresar
            </Button>

            <div className="text-center">
              <p className="text-white">¿No tienes una cuenta?</p> {/* Texto en blanco */}
              <Button variant="link" onClick={handleRegisterRedirect}>
                Regístrate
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
