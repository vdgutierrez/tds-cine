import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Detalle = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener el token desde localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No estás autenticado. Por favor inicia sesión.");
      return; // Si no hay token, detenemos la ejecución.
    }

    // Llamada a la API para obtener los detalles de la película
    const fetchPelicula = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/peliculas/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Incluimos el token en los headers
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener los detalles de la película");
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
    return <div className="text-center">{error}</div>;
  }

  if (!pelicula) {
    return <h1 className="text-center">Cargando detalles...</h1>;
  }

  const handleContinue = () => {
    // Redirige al componente `/cinema-room`
    navigate("/cinema-room");
  };

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

            {/* Botón Continuar */}
            <div className="text-center mt-4">
              <Button variant="primary" onClick={handleContinue}>
                Continuar
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Detalle;
