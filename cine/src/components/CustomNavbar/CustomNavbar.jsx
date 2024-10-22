import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';	

function CustomNavbar() {
  return (
    <>
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
              <Button as={Link} to="/login" variant="danger" className="me-2">INICIAR SESIÓN</Button>
              <Button as={Link} to="/register" variant="danger">REGISTRARSE</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://comprar2.cinecenter.com.bo/ApirestCMS//assets/2/banners/caceria.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://comprar2.cinecenter.com.bo/ApirestCMS//assets/1/banners/smile%202.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://comprar2.cinecenter.com.bo/ApirestCMS//assets/1/banners/banner%20para%20weeb%201920x402joker.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default CustomNavbar;
