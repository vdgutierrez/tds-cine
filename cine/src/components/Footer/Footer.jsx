import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function App() {
  return (
<footer className='bg-dark text-center text-white'>
  <Container fluid className='p-4 pb-0'>
    <Row className="justify-content-center">
      <Col xs="auto">
        <Button variant="outline-light" className="m-1">
          <FaFacebookF />
        </Button>
        {/* Otros botones */}
      </Col>
    </Row>
  </Container>
  <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
    © 2020 Copyright:  
    <a className='text-white' href='#'>
      micinebolivia.com
    </a>
  </div>
</footer>
  );
}
