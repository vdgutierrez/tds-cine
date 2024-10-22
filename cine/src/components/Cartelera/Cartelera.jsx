import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Cartelera = ({ data }) => {
  return (
    <div className="d-flex justify-content-center" style={{ padding: '5%' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-white">CARTELERA</h1>
          </Col>
        </Row>

        <Row xs={1} md={5} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <Card className="bg-dark text-white"> {/* Tarjeta con fondo oscuro y texto blanco */}
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title> {/* Título del Card en blanco */}
                  <Card.Text>{item.text}</Card.Text> {/* Texto del Card en blanco */}
                  <footer className="blockquote-footer text-white">
                    {item.footer} in <cite title="Source Title">{item.source}</cite> {/* Footer en blanco */}
                  </footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Cartelera;
