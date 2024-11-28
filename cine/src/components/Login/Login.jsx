import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Incorrecto
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); // Guardar el token en localStorage
      const decodedToken = jwtDecode(token); // Decodificar el token
      console.log('Usuario logueado:', decodedToken.sub); // Mostrar el correo en consola

      navigate('/cartelera'); // Redirige a la pantalla de cartelera
      window.location.reload(); // Recargar la página después de redirigir
    } catch (error) {
      console.error('Error de autenticación:', error);
      alert('Usuario o contraseña incorrecta');
    }
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
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <FaUser />
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContraseña">
              <Form.Label className="text-white">Contraseña</Form.Label> {/* Label en blanco */}
              <div className="input-group">
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="input-group-text">
                  <FaLock />
                </span>
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
