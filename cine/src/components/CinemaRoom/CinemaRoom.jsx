import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const CinemaRoom = () => {
  // Estados para manejar los datos y selecciones
  const [seatMap, setSeatMap] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el proyeccionId de la URL
  const proyeccionId = new URLSearchParams(location.search).get("proyeccion");

  // Cargar el mapa de asientos
  useEffect(() => {
    const fetchSeatMap = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado. Por favor inicia sesión.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/proyecciones/${proyeccionId}/asientos`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al cargar el mapa de asientos");
        const data = await response.json();
        setSeatMap(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (proyeccionId) {
      fetchSeatMap();
    }
  }, [proyeccionId]);

  // Manejador para selección de asientos
  const handleSeatClick = (fila, numero, estado, id) => {
    if (estado === "OCUPADO") return;

    const seatId = `${fila}${numero}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  const handleCompra = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No estás autenticado. Por favor inicia sesión.");
      return;
    }
  
    try {
      // Formatear asientos al formato requerido (dos dígitos)
      const asientosFormateados = selectedSeats.map(asiento => {
        const fila = asiento[0];
        const numero = asiento.slice(1).padStart(2, '0');
        return `${fila}${numero}`;
      });
  
      const response = await fetch(`http://localhost:8080/api/reservas?proyeccionId=${proyeccionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(asientosFormateados)
      });
  
      if (!response.ok) throw new Error('Error al procesar la reserva');
      
      const reserva = await response.json();
      // Navegar a la página de pago con los datos de la reserva
      navigate('/pago', { state: { reserva } });
    } catch (error) {
      setError(error.message);
    }
  };

  // Color del asiento según su estado
  const getSeatColor = (estado, isSelected) => {
    if (isSelected) return "gray";
    switch (estado) {
      case "OCUPADO": return "black";
      case "DISPONIBLE": return "white";
      case "ESPECIAL": return "blue";
      default: return "white";
    }
  };

  if (error) return <div className="text-center text-white">{error}</div>;
  if (!seatMap) return <div className="text-center text-white">Cargando mapa de asientos...</div>;

  return (
    <Container>
      {/* Título */}
      <Row className="mb-4">
        <Col>
          <h1 className="text-center text-white">Elige tu butaca</h1>
        </Col>
      </Row>

      {/* Pantalla de cine */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} className="text-center">
          <div className="screen mb-4" style={{
            background: "linear-gradient(to bottom, #444444, #222222)",
            height: "50px",
            width: "80%",
            margin: "0 auto",
            borderRadius: "50%",
          }}>
            <span className="text-white">PANTALLA</span>
          </div>
        </Col>
      </Row>

      {/* Mapa de asientos */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={8} className="text-center">
          {/* Números de columna */}
          <div className="d-flex justify-content-center mb-2">
            <div style={{ width: "30px" }}></div>
            {[...Array(seatMap.dimensiones.columnas)].map((_, idx) => (
              <div key={idx} style={{ width: "30px" }} className="text-white">
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Filas de asientos */}
          {Object.entries(seatMap.asientosPorFila).map(([fila, asientos]) => (
            <div key={fila} className="d-flex justify-content-center align-items-center mb-2">
              <div style={{ width: "30px" }} className="text-white">{fila}</div>
              {asientos.map((asiento) => (
                <Button
                  key={asiento.id}
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "2px",
                    padding: "0",
                    backgroundColor: getSeatColor(asiento.estado, selectedSeats.includes(`${asiento.fila}${asiento.numero}`)),
                    border: "1px solid #666",
                    cursor: asiento.estado === "OCUPADO" ? "not-allowed" : "pointer"
                  }}
                  onClick={() => handleSeatClick(asiento.fila, asiento.numero, asiento.estado, asiento.id)}
                  disabled={asiento.estado === "OCUPADO"}
                />
              ))}
            </div>
          ))}
        </Col>
      </Row>

      {/* Leyenda */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="text-center">
          <div className="d-flex justify-content-center gap-4">
            {Object.entries(seatMap.leyenda).map(([key, value]) => (
              <div key={key} className="d-flex align-items-center">
                <div style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: getSeatColor(key),
                  marginRight: "8px",
                  border: "1px solid #666"
                }}></div>
                <span className="text-white">{value}</span>
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/* Resumen de compra */}
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Card style={{ backgroundColor: '#2a2f40', border: 'none' }}>
            <Card.Body>
              <h3 className="text-white mb-3">Resumen de Compra</h3>
              <div className="text-white">
                <p><strong>Asientos seleccionados:</strong> {selectedSeats.join(", ")}</p>
                <p><strong>Cantidad de entradas:</strong> {selectedSeats.length}</p>
                <div className="text-center mt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    style={{ backgroundColor: '#0b559e', borderColor: '#0b559e' }}
                    disabled={selectedSeats.length === 0}
                    onClick={handleCompra}
                  >
                    Comprar entradas
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CinemaRoom;