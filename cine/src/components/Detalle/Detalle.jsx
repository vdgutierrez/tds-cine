import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Detalle = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const navigate = useNavigate();
  
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Llamada a la API
    const fetchPelicula = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/peliculas/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener los detalles de la película');
        }
        const data = await response.json();
        console.log("Datos recibidos:", data); // Depuración
        setPelicula(data);
      } catch (error) {
        setError(error.message); // Si ocurre un error, lo almacena en el estado
        console.error("Error al cargar la película:", error);
      }
    };

    fetchPelicula();
  }, [id]); // Recarga cuando cambia el id

  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  if (!pelicula) {
    return <h1 className="text-center">Cargando detalles...</h1>;
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
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
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
