import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Cartelera = () => {
  const [data, setData] = useState([]); // Ya no usamos datos de prueba
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las películas desde la API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://192.168.102.78:8080/api/peliculas/cartelera'); // URL de la API real
      if (!response.ok) {
        throw new Error('Error en la solicitud a la API');
      }
      const result = await response.json();
      setData(result); // Almacena los datos en el estado
      setLoading(false); // Cambia el estado de carga
    } catch (error) {
      setError(error.message); // Si ocurre un error, lo almacena en el estado
      setLoading(false); // Cambia el estado de carga
    }
  };

  // useEffect para cargar las películas cuando el componente se monta
  useEffect(() => {
    fetchData(); // Cargar los datos
  }, []);

  // Si los datos están cargando, muestra un mensaje de carga
  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  // Si ocurre un error, muestra un mensaje de error
  if (error) {
    return <div className="text-center">Error: {error}</div>;
  }

  return (
    <div className="d-flex justify-content-center" style={{ padding: '5%' }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-white">Cartelera</h1> {/* Título en blanco */}
          </Col>
        </Row>

        <Row xs={1} md={5} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={item.poster} /> {/* Cambia a item.poster si la API devuelve la URL del póster */}
                <Card.Body>
                  <Card.Title>{item.titulo}</Card.Title>
                  <Card.Text>{item.descripcion}</Card.Text>
                  <Card.Text><strong>Duración:</strong> {item.duracion} min</Card.Text> {/* Muestra la duración */}
                  <Card.Text><strong>Estudio:</strong> {item.estudio}</Card.Text> {/* Muestra el estudio */}
                  <footer className="blockquote-footer">
                    {item.director} {/* Cambia a la propiedad que contiene el nombre del director */}
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
