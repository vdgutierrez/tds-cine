import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

const Pago = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reserva } = location.state || {};
  const [tiempoRestante, setTiempoRestante] = useState('');

  // Efecto para el contador de tiempo
  useEffect(() => {
    if (!reserva) return;

    const calcularTiempoRestante = () => {
      const expiracion = new Date(reserva.fechaExpiracion);
      const ahora = new Date();
      const diferencia = expiracion - ahora;

      if (diferencia < 0) {
        setTiempoRestante('EXPIRADO');
        return false;
      }

      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
      setTiempoRestante(`${minutos}:${segundos.toString().padStart(2, '0')}`);
      return true;
    };

    // Iniciar el contador
    calcularTiempoRestante();
    const intervalo = setInterval(() => {
      const continuarContando = calcularTiempoRestante();
      if (!continuarContando) {
        clearInterval(intervalo);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [reserva]);

  // Si no hay reserva, mostrar error
  if (!reserva) {
    return (
      <div className="content-background">
        <Container>
          <div className="text-center text-white">
            <h2>Error</h2>
            <p>No se encontraron datos de la reserva</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/cartelera')}
              style={{ backgroundColor: '#0b559e', borderColor: '#0b559e' }}
            >
              Volver a Cartelera
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });
  };

  return (
    <div className="content-background" style={{ padding: '5%' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card style={{ backgroundColor: '#2a2f40', border: 'none' }}>
              <Card.Body className="text-white">
                <h2 className="text-center mb-4">Resumen de la Reserva</h2>
                
                {/* QR Code */}
                <div className="text-center mb-4">
                  <QRCodeCanvas 
                    value={reserva.codigoPago}
                    size={200}
                    level="H"
                    style={{ padding: '10px', backgroundColor: 'white' }}
                  />
                  <p className="mt-2">Código de Pago: {reserva.codigoPago}</p>
                </div>

                {/* Detalles de la reserva */}
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Detalles de la Reserva</h4>
                  <p><strong>Asientos:</strong> {reserva.asientosSeleccionados.join(', ')}</p>
                  <p><strong>Monto Total:</strong> ${reserva.montoTotal}</p>
                  <p><strong>Estado:</strong> {reserva.estadoPago}</p>
                  <p className="text-warning">
                    <strong>Tiempo restante para pagar:</strong> {tiempoRestante}
                  </p>
                  <p><strong>Expira:</strong> {formatearFecha(reserva.fechaExpiracion)}</p>
                </div>

                {/* Instrucciones de pago */}
                <div className="mb-4">
                  <h4 className="border-bottom pb-2">Instrucciones de Pago</h4>
                  <ol className="ps-3">
                    <li>Escanea el código QR con tu aplicación bancaria</li>
                    <li>Realiza el pago por ${reserva.montoTotal}</li>
                    <li>Una vez completado el pago, recibirás tus entradas por correo</li>
                  </ol>
                </div>

                {/* Botones de acción */}
                <div className="d-flex justify-content-between mt-4">
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/cartelera')}
                  >
                    Volver a Cartelera
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Pago;