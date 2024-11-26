import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Incorrect
;

function CustomNavbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.sub); // Assuming the 'sub' field contains the user's email
        setLoggedIn(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setEmail(null);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MI CINE BOLIVIA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/cartelera">CARTELERA</Nav.Link>
            <Nav.Link as={Link} to="/horarios">HORARIOS</Nav.Link>
            <Nav.Link as={Link} to="/sobre-nosotros">SOBRE NOSOTROS</Nav.Link>
          </Nav>
          <div>
            {loggedIn ? (
              <>
                <span className="text-white me-3">Bienvenido, {email}</span>
                <Button variant="danger" onClick={handleLogout}>CERRAR SESIÓN</Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="danger" className="me-2">INICIAR SESIÓN</Button>
                <Button as={Link} to="/register" variant="danger">REGISTRARSE</Button>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
