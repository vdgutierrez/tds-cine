import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Cartelera = () => {
  const [data, setData] = useState([
    {
      title: "Pelicula 1",
      text: "Descripción de la Pelicula 1...",
      footer: "Director Famoso",
      source: "Fuente 1",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      title: "Pelicula 2",
      text: "Descripción de la Pelicula 2...",
      footer: "Director 2",
      source: "Fuente 2",
      imageUrl: "https://via.placeholder.com/150"
    },
    {
      title: "Pelicula 3",
      text: "Descripción de la Pelicula 3...",
      footer: "Director 3",
      source: "Fuente 3",
      imageUrl: "https://via.placeholder.com/150"
    }
  ]); // Inicializamos con datos de prueba

  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las películas desde la API o usar los datos de prueba
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simula la carga de datos de la API, descomenta cuando la API esté disponible
      // const response = await fetch('http://localhost:8080/api/peliculas/cartelera');
      // if (!response.ok) {
      //   throw new Error('Error en la solicitud a la API');
      // }
      // const result = await response.json();
      // setData(result); // Almacena los datos en el estado
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
                <Card.Img variant="top" src={item.imageUrl} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.text}</Card.Text>
                  <footer className="blockquote-footer">
                    {item.footer} in <cite title="Source Title">{item.source}</cite>
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
