import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const CarteleraFiltrada = () => {
  const [data, setData] = useState([]); // Datos de las películas
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [filter, setFilter] = useState('3D'); // Filtro inicial

  // Datos de prueba (mock)
  const mockData = [
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
    }
  ];

  // Función para obtener las películas filtradas desde la API o usar los datos de prueba
  const fetchData = async (tipoProyeccion) => {
    setLoading(true);
    setError(null);

    try {
      // Descomentar para utilizar la API cuando esté disponible
      // const response = await fetch(`http://localhost:8080/api/peliculas/cartelera?tipoProyeccion=${tipoProyeccion}`);
      // if (!response.ok) {
      //   throw new Error('Error en la solicitud a la API');
      // }
      // const result = await response.json();
      
      // Mientras esperas la API, usa los datos de prueba
      const result = mockData; // Usa los datos de prueba
      
      setData(result); // Almacena los datos en el estado
      setLoading(false); // Cambia el estado de carga
    } catch (error) {
      setError(error.message); // Si ocurre un error, lo almacena en el estado
      setLoading(false); // Cambia el estado de carga
    }
  };

  // Función para cambiar el filtro
  const handleFilterChange = (tipoProyeccion) => {
    setFilter(tipoProyeccion); // Actualiza el filtro
  };

  // useEffect para cargar las películas cuando se cambia el filtro
  useEffect(() => {
    fetchData(filter); // Cargar los datos cuando el filtro cambia
  }, [filter]);

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
            <h1 className="text-center text-white">Cartelera Filtrada</h1>
            <p className="text-center text-white">Selecciona un formato:</p>
            {/* Botones para filtrar por tipo de proyección */}
            <div className="d-flex justify-content-center mb-3">
              <Button variant={filter === '3D' ? 'primary' : 'secondary'} onClick={() => handleFilterChange('3D')}>
                3D
              </Button>
              <Button variant={filter === '2D' ? 'primary' : 'secondary'} onClick={() => handleFilterChange('2D')} className="ms-2">
                2D
              </Button>
              <Button variant={filter === '2D ATMOS' ? 'primary' : 'secondary'} onClick={() => handleFilterChange('2D ATMOS')} className="ms-2">
                2D ATMOS
              </Button>
              <Button variant={filter === '4D E-MOTION 2D' ? 'primary' : 'secondary'} onClick={() => handleFilterChange('4D E-MOTION 2D')} className="ms-2">
                4D E-MOTION 2D
              </Button>
              <Button variant={filter === '2D CXC ATMOS' ? 'primary' : 'secondary'} onClick={() => handleFilterChange('2D CXC ATMOS')} className="ms-2">
                2D CXC ATMOS
              </Button>
            </div>
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

export default CarteleraFiltrada;
