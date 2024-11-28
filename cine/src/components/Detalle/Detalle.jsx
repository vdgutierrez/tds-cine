import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Detalle = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const navigate = useNavigate();
  
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    // Datos de ejemplo, reemplazarlos con datos reales de la API
    const datosDePrueba = {
      id: 3,
      titulo: "Pulp Fiction",
      genero: "Crimen/Drama",
      duracion: 154,
      clasificacion: "R (Mayores de 18)",
      poster: "https://storage.googleapis.com/siscine.appspot.com/https%3A//ejemplo.com/pulpfiction.jpg",
      trailer: "https://ejemplo.com/pulpfiction-trailer.mp4",
      formatos: [
        { nombre: "2D", activo: false },
        { nombre: "3D", activo: true }
      ],
      fechasDisponibles: [
        { fecha: "2024-11-27", nombreDia: "miércoles", numeroDia: "27", nombreMes: "nov", activo: true },
        { fecha: "2024-11-28", nombreDia: "jueves", numeroDia: "28", nombreMes: "nov", activo: false }
      ],
      horarios: [
        { proyeccionId: 31, hora: "16:00:00", disponible: true },
        { proyeccionId: 39, hora: "19:00:00", disponible: true }
      ]
    };

    // Aquí puedes hacer la llamada a la API según el id
    // setPelicula(datosDePrueba); // Para pruebas

    // Llamar a la API (si está disponible)
    const fetchPelicula = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/peliculas/${id}`);
        const data = await response.json();
        setPelicula(data);
      } catch (error) {
        console.error("Error al cargar la película:", error);
      }
    };

    fetchPelicula();
  }, [id]); // Recarga cuando cambia el id

  if (!pelicula) {
    return <h1>Cargando detalles...</h1>;
  }

  return (
    <div className="d-flex justify-content-center" style={{ padding: "5%" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1>{pelicula.titulo}</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={4}>
            <Card>
              <Card.Img variant="top" src={pelicula.poster} />
              <Button
                className="mt-2"
                variant="secondary"
                onClick={() => navigate("/cartelera")}
              >
                Volver a Cartelera
              </Button>
            </Card>
          </Col>

          <Col xs={12} md={8}>
            <div className="mb-3">
              <div className="embed-responsive embed-responsive-16by9 mb-3">
                <iframe
                  className="embed-responsive-item"
                  src={pelicula.trailer}
                  title="Tráiler"
                  allowFullScreen
                  style={{ width: "100%", height: "400px", borderRadius: "8px", border: "1px solid #ccc" }}
                ></iframe>
              </div>
            </div>

            {/* Detalles de la película */}
            <Card className="mb-3">
              <Card.Body>
                <h5>Detalles de la película</h5>
                <p><strong>Género:</strong> {pelicula.genero}</p>
                <p><strong>Duración:</strong> {pelicula.duracion} min</p>
                <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
              </Card.Body>
            </Card>

            {/* Sinopsis */}
            <Card className="mb-3">
              <Card.Body>
                <h5>Sinopsis</h5>
                <p>{pelicula.descripcion}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detalle;
