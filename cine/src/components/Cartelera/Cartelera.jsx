import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'; // Asegúrate de que Button esté importado
import { Link } from 'react-router-dom'; // Asegúrate de que Link esté importado
import './Cartelera.css';

const Cartelera = () => {
  const [data, setData] = useState([]); // Ya no usamos datos de prueba
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para obtener las películas desde la API
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token'); // Obtener el token desde el localStorage
      if (!token) {
        setError('No estás autenticado');
        setLoading(false);
        return;
      }

      // Configurar los encabezados con el token de autorización
      const response = await fetch('http://localhost:8080/api/peliculas/cartelera', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Enviar el token en el encabezado Authorization
        }
      });

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
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={item.poster} />
                <Card.Body>
                  <Card.Title>{item.titulo}</Card.Title>
                  <Card.Text>{item.descripcion}</Card.Text>
                  <Card.Text><strong>Duración:</strong> {item.duracion} min</Card.Text>
                  <Card.Text><strong>Estudio:</strong> {item.estudio}</Card.Text>
                  <Link to={`/detalle/${item.id}`}>
                    <Button variant="primary">Ver Detalle</Button>
                  </Link>
                  <footer className="blockquote-footer">
                    {item.director}
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
