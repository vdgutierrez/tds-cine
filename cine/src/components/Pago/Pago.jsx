import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PagoPelicula = ({ pelicula, asientosSeleccionados, total }) => {
  const [metodoPago, setMetodoPago] = useState('Transferencia QR'); // Método de pago por defecto

  // Generamos la URL de pago (simulando una URL de pago)
  const urlPago = "http://localhost:8080/pago?pelicula=" + encodeURIComponent(pelicula.titulo) + "&total=" + total;

  return (
    <Container>
      <h1 className="text-center mt-4">Proceso de Pago</h1>
      <Row className="mt-4">
        <Col xs={12} md={6}>
          {/* Información de la película seleccionada */}
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{pelicula.titulo}</Card.Title>
              <Card.Text><strong>Formato:</strong> {pelicula.formatoSeleccionado}</Card.Text>
              <Card.Text><strong>Fecha:</strong> {pelicula.fechaSeleccionada}</Card.Text>
              <Card.Text><strong>Asientos Seleccionados:</strong> {asientosSeleccionados.join(', ')}</Card.Text>
              <Card.Text><strong>Total de entradas:</strong> {asientosSeleccionados.length}</Card.Text>
            </Card.Body>
          </Card>

          {/* Métodos de pago */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Métodos de pago</h5>
              <Button variant={metodoPago === 'Transferencia QR' ? 'primary' : 'outline-primary'} onClick={() => setMetodoPago('Transferencia QR')}>
                Pago en Linea (Transferencia QR)
              </Button>
              <Button variant={metodoPago === 'Tarjeta de Crédito' ? 'primary' : 'outline-primary'} onClick={() => setMetodoPago('Tarjeta de Crédito')}>
                Tarjeta de Crédito
              </Button>
              <Button variant={metodoPago === 'Paypal' ? 'primary' : 'outline-primary'} onClick={() => setMetodoPago('Paypal')}>
                Paypal
              </Button>
            </Card.Body>
          </Card>

        </Col>

        <Col xs={12} md={6}>
          {/* Imagen de pago en lugar del QR */}
          <Card className="mb-4">
            <Card.Body>
              <h5>Pago en Linea (Transferencia QR)</h5>
              <p>Para completar tu pago, abre tu aplicación de billetera o banca móvil y escanea el siguiente código QR:</p>
              {/* Imagen de ejemplo */}
              <img 
                src="https://via.placeholder.com/256x256.png?text=Escanea+para+Pagar" 
                alt="Código QR de pago"
                style={{ width: '100%', maxWidth: '256px', height: 'auto' }} 
              />
              <p className="mt-3"><strong>Total a pagar:</strong> ${total}</p>
            </Card.Body>
          </Card>

          {/* Botón para completar el pago */}
          <div className="text-center">
            <Button variant="success" onClick={() => alert('Pago completado!')}>
              Verificar Pago
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PagoPelicula;
