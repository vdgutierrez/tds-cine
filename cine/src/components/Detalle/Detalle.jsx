import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Detalle = () => {
  // Estados para manejar datos y selecciones
  const { id } = useParams();
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // Efecto para cargar datos de la película con parámetros de búsqueda
  useEffect(() => {
    const fetchPelicula = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No estás autenticado. Por favor inicia sesión.");
        return;
      }

      try {
        // Construir URL con parámetros de búsqueda
        let url = `http://localhost:8080/api/peliculas/${id}/sesiones`;
        const params = new URLSearchParams();
        if (selectedDate) params.append('fecha', selectedDate);
        if (selectedFormat) params.append('formato', selectedFormat);
        if (params.toString()) url += `?${params.toString()}`;

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("No se pudo obtener los detalles de la película");
        const data = await response.json();
        setPelicula(data);
      } catch (error) {
        setError(error.message);
        console.error("Error al cargar la película:", error);
      }
    };

    fetchPelicula();
  }, [id, selectedDate, selectedFormat]);

  // Manejadores de eventos
  const handleFormatSelect = (formato) => {
    setSelectedFormat(formato);
  };

  const handleDateSelect = (fecha) => {
    setSelectedDate(fecha);
  };

  const handleScheduleSelect = (proyeccionId) => {
    setSelectedSchedule(proyeccionId);
  };

  const handleReserveClick = () => {
    if (selectedSchedule) {
      navigate(`/cinema-room?proyeccion=${selectedSchedule}`);
    }
  };

  if (error) return <div className="text-center text-white">{error}</div>;
  if (!pelicula) return <h1 className="text-center text-white">Cargando detalles...</h1>;

  return (
    <div className="content-background" style={{ padding: "5%" }}>
      <Container>
        {/* Sección superior con título y poster */}
        <Row className="mb-4">
          <Col xs={12} md={4}>
            <Card style={{ backgroundColor: '#2a2f40', border: 'none' }}>
              <Card.Img variant="top" src={pelicula.poster} />
              <Button
                className="mt-2"
                variant="primary"
                onClick={() => navigate("/cartelera")}
                style={{ backgroundColor: '#0b559e', borderColor: '#0b559e' }}
              >
                Volver a Cartelera
              </Button>
            </Card>
          </Col>

          <Col xs={12} md={8} className="text-white">
            <h1 className="mb-4">{pelicula.titulo}</h1>
            
            {/* Reproductor de tráiler */}
            <div className="mb-4">
              <iframe
                src={pelicula.trailer}
                title="Tráiler"
                allowFullScreen
                className="w-full"
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "8px",
                }}
              />
            </div>

            {/* Detalles de la película */}
            <Card style={{ backgroundColor: '#2a2f40', border: 'none' }} className="mb-3">
              <Card.Body className="text-white">
                <h5>Detalles de la película</h5>
                <p><strong>Género:</strong> {pelicula.genero}</p>
                <p><strong>Duración:</strong> {pelicula.duracion} min</p>
                <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Sección de selección de formato y fechas */}
        <Row className="mb-4">
          <Col xs={12} className="text-center text-white">
            <h4 className="mb-3">Seleccione un formato</h4>
            <div className="d-flex justify-content-center gap-2">
              {pelicula.formatos.map((formato) => (
                <Button
                  key={formato.nombre}
                  variant={formato.activo ? "primary" : "outline-primary"}
                  onClick={() => handleFormatSelect(formato.nombre)}
                  style={formato.activo ? { backgroundColor: '#0b559e', borderColor: '#0b559e' } : {}}
                >
                  {formato.nombre}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Calendario de fechas */}
        <Row className="mb-4">
          <Col xs={12}>
            <div className="d-flex justify-content-center gap-3 overflow-auto">
              {pelicula.fechasDisponibles.map((fecha) => (
                <Button
                  key={fecha.fecha}
                  variant={fecha.activo ? "primary" : "outline-primary"}
                  className="d-flex flex-column align-items-center p-3"
                  onClick={() => handleDateSelect(fecha.fecha)}
                  style={fecha.activo ? { backgroundColor: '#0b559e', borderColor: '#0b559e' } : {}}
                >
                  <span className="text-uppercase">{fecha.nombreDia}</span>
                  <span className="fs-4">{fecha.numeroDia}</span>
                  <span>{fecha.nombreMes}</span>
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Horarios disponibles */}
        <Row className="mb-4">
          <Col xs={12}>
            <h4 className="text-center text-white mb-3">Horarios disponibles</h4>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              {pelicula.horarios.map((horario) => (
                <Button
                  key={horario.proyeccionId}
                  variant={horario.disponible ? 
                    (selectedSchedule === horario.proyeccionId ? "primary" : "outline-primary") : 
                    "secondary"}
                  disabled={!horario.disponible}
                  onClick={() => handleScheduleSelect(horario.proyeccionId)}
                  className="mb-2"
                  style={selectedSchedule === horario.proyeccionId ? 
                    { backgroundColor: '#0b559e', borderColor: '#0b559e' } : {}}
                >
                  <div>{horario.hora.substring(0, 5)}</div>
                  <small>{horario.salaNombre}</small>
                  <div><small>{horario.asientosDisponibles} asientos</small></div>
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Botón de Reserva */}
        <Row>
          <Col xs={12} className="text-center">
            <Button
              variant="primary"
              size="lg"
              style={{ 
                backgroundColor: '#0b559e', 
                borderColor: '#0b559e',
                padding: '15px 40px',
                fontSize: '1.2rem'
              }}
              disabled={!selectedSchedule}
              onClick={handleReserveClick}
            >
              Ir a la Reserva de Asientos
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detalle;