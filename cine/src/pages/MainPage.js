import React from 'react';
import { Link } from 'react-router-dom';  // Importamos Link para la navegación entre páginas
import Cartelera from '../components/Cartelera/Cartelera';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';  // Usamos un botón de Bootstrap

// Datos de prueba para las películas
const data = [
  {
    title: "Movie Title 1",
    text: "This is a longer card with supporting text below...",
    footer: "Someone famous",
    source: "Source Title 1",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/588.jpg"
  },
  {
    title: "Movie Title 2",
    text: "Another description for this card...",
    footer: "Another famous person",
    source: "Source Title 2",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/589.jpg"
  },
  {
    title: "Movie Title 3",
    text: "A thrilling action-packed movie!",
    footer: "Famous Actor",
    source: "Source Title 3",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/588.jpg"
  },
  {
    title: "Movie Title 4",
    text: "Romantic drama about love and loss.",
    footer: "Another Star",
    source: "Source Title 4",
    imageUrl: "https://comprar2.cinecenter.com.bo/billboard/app/poster/generic/589.jpg"
  },
  // Agrega más datos si es necesario
];

const MainPage = () => {
  return (
    <div className="content-background">
      <Container className="mt-5">
        <h1 className="text-center text-white">Bienvenido a Mi Cine Bolivia</h1>
        <p className="text-center text-white">Explora nuestras películas y selecciona una para ver más detalles</p>

        {/* Cartelera de películas */}
        <Cartelera data={data} />

        {/* Botón para navegar a la sala de cine */}
        <div className="text-center mt-4">
          <Link to="/cinema-room">  {/* Enlace a la sala de cine */}
            <Button variant="primary">Ver Sala de Cine</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
