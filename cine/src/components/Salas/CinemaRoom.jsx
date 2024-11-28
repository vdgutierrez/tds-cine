import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const CinemaRoom = ({ pelicula, precio }) => {
  const [asientos, setAsientos] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);

  // Simulamos la llamada al endpoint con datos estáticos
  useEffect(() => {
    // Datos estáticos de ejemplo
    const datosAsientos = {
      "proyeccionId": 86,
      "dimensiones": { "filas": 5, "columnas": 10 },
      "leyenda": {
        "ESPECIAL": "Asiento para personas con movilidad reducida",
        "DISPONIBLE": "Asiento disponible para selección",
        "OCUPADO": "Asiento ya reservado"
      },
      "sala": {
        "tipo": "Normal",
        "id": 1,
        "nombre": "Sala 1"
      },
      "asientosPorFila": {
        "A": [
          { "estado": "OCUPADO", "numero": "01", "fila": "A", "id": 1 },
          { "estado": "OCUPADO", "numero": "02", "fila": "A", "id": 2 },
          { "estado": "DISPONIBLE", "numero": "03", "fila": "A", "id": 3 },
          { "estado": "DISPONIBLE", "numero": "04", "fila": "A", "id": 4 },
          { "estado": "DISPONIBLE", "numero": "05", "fila": "A", "id": 5 },
          { "estado": "DISPONIBLE", "numero": "06", "fila": "A", "id": 6 },
          { "estado": "DISPONIBLE", "numero": "07", "fila": "A", "id": 7 },
          { "estado": "DISPONIBLE", "numero": "08", "fila": "A", "id": 8 },
          { "estado": "DISPONIBLE", "numero": "09", "fila": "A", "id": 9 },
          { "estado": "DISPONIBLE", "numero": "10", "fila": "A", "id": 10 }
        ],
        "B": [
          { "estado": "DISPONIBLE", "numero": "01", "fila": "B", "id": 11 },
          { "estado": "DISPONIBLE", "numero": "02", "fila": "B", "id": 12 },
          { "estado": "DISPONIBLE", "numero": "03", "fila": "B", "id": 13 },
          { "estado": "DISPONIBLE", "numero": "04", "fila": "B", "id": 14 },
          { "estado": "DISPONIBLE", "numero": "05", "fila": "B", "id": 15 },
          { "estado": "DISPONIBLE", "numero": "06", "fila": "B", "id": 16 },
          { "estado": "DISPONIBLE", "numero": "07", "fila": "B", "id": 17 },
          { "estado": "DISPONIBLE", "numero": "08", "fila": "B", "id": 18 },
          { "estado": "DISPONIBLE", "numero": "09", "fila": "B", "id": 19 },
          { "estado": "DISPONIBLE", "numero": "10", "fila": "B", "id": 20 }
        ],
        // ... Agregar C, D y E de forma similar
      }
    };

    // Asignamos los asientos al estado
    setAsientos(Object.values(datosAsientos.asientosPorFila).flat());
  }, []);

  // Maneja la selección de asientos
  const handleSeatClick = (fila, columna, estado) => {
    if (estado !== "DISPONIBLE") return; // Si el asiento no está disponible, no hace nada

    const asientoId = `${fila}${columna}`;
    const nuevoSeleccionados = [...asientosSeleccionados];

    if (nuevoSeleccionados.includes(asientoId)) {
      // Si ya está seleccionado, deseleccionarlo
      setAsientosSeleccionados(nuevoSeleccionados.filter(seat => seat !== asientoId));
      setTotal(total - precio.adulto); // Si es adulto, descontamos el precio
    } else {
      // Si no está seleccionado, agregarlo
      setAsientosSeleccionados([...nuevoSeleccionados, asientoId]);
      setTotal(total + precio.adulto); // Añadimos el precio del asiento
    }
  };

  // Función para enviar la reserva
  const handleBuyTickets = async () => {
    const asientosSeleccionadosIds = asientosSeleccionados.map(asiento => {
      // Convertir "A03" en "A03" (formato de número de asiento)
      return `${asiento.slice(0, 1)}${asiento.slice(1)}`;
    });

    // Llamada al endpoint POST
    const response = await fetch(`http://localhost:8080/api/reservas?proyeccionId=86`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asientosSeleccionadosIds),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Reserva exitosa:", data);
    } else {
      console.error("Error en la reserva:", data);
    }
  };

  // Renderizamos cada asiento
  const renderSeat = (fila, columna, estado) => {
    const asientoId = `${fila}${columna}`;
    let seatColor = 'white'; // Default color: disponible
    if (estado === 'DISPONIBLE') seatColor = 'white'; // Asiento disponible
    if (estado === 'OCUPADO') seatColor = 'black'; // Asiento ocupado
    if (asientosSeleccionados.includes(asientoId)) seatColor = 'gray'; // Seleccionado

    return (
      <Col key={columna}>
        <Button
          style={{ backgroundColor: seatColor, width: '30px', height: '30px', margin: '5px' }}
          onClick={() => handleSeatClick(fila, columna, estado)}
          disabled={estado !== 'DISPONIBLE'}
        />
      </Col>
    );
  };

  return (
    <Container>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>{pelicula.titulo}</Card.Title>
          <Card.Text>{pelicula.detalle}</Card.Text>
          <Card.Text>
            <strong>Duración:</strong> {pelicula.duracion}
          </Card.Text>
        </Card.Body>
      </Card>
      <br />

      <div className="seat-map">
        <br />
        <br />
        <h1 className='text-center row-letter'>PANTALLA</h1>
        <Card>
          <p></p>
        </Card>
        <br />
        <br />
        <Row>
          {/* Mostrar los números de las columnas una vez */}
          <Col xs={1} className="text-center"></Col>{" "}
          {/* Espacio vacío para las filas */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((columna) => (
            <Col key={columna} xs={1} className="text-center">
              {/* Mostrar el número de columna una sola vez en la parte superior */}
              <div>
                <span className='column-number'>{columna}</span>
              </div>
            </Col>
          ))}
        </Row>
        {["A", "B", "C", "D", "E"].map((fila) => (
          <Row key={fila}>
            {/* Mostrar el nombre de la fila (A, B, C, D, E) */}
            <Col xs={1} className="text-center">
              <strong className='row-letter'>{fila}</strong>
            </Col>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((columna) => {
              const asiento = asientos.find(
                (seat) => seat.fila === fila && seat.numero === columna.toString()
              );
              
              return (
                <Col key={columna} xs={1} className="text-center">
                  {/* Renderizar el asiento */}
                  {renderSeat(
                    fila,
                    columna,
                    asiento ? asiento.estado : "DISPONIBLE"
                  )}
                </Col>
              );
            })}
          </Row>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <Card className="mt-4">
        <Card.Body>
          <h3>RESUMEN DE COMPRA</h3>
          <p>
            <strong>Asientos seleccionados:</strong>{" "}
            {asientosSeleccionados.length}
          </p>
          <p>
            <strong>Precio unitario:</strong> {precio.adulto}
          </p>
          <p>
            <strong>Precio total:</strong> ${total}
          </p>
          <Button variant="success" onClick={handleBuyTickets}>
            Comprar Entradas
          </Button>
        </Card.Body>
      </Card>
      <br />
      <br />
    </Container>
  );
};

export default CinemaRoom;
