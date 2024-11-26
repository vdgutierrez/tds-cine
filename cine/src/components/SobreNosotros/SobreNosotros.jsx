import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './SobreNosotros.css'; // Asegúrate de importar el archivo CSS para los estilos personalizados

const SobreNosotros = () => {
  return (
    <Container style={{ marginTop: '5%', marginBottom: '5%' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm card-transparency mb-4"> {/* Aplica la clase personalizada */}
            <Card.Body>
              <h1 className="text-center mb-4">Sobre Nosotros</h1>
              <p>
                ¡Bienvenido a <strong>Mi Cine Bolivia</strong>, tu destino favorito para disfrutar de las mejores películas! 
                Somos un cine ubicado en el corazón de la ciudad de La Paz, dedicado a brindar la mejor experiencia cinematográfica 
                a nuestros visitantes. Con años de experiencia en la industria del entretenimiento, nuestro objetivo es ofrecer una 
                experiencia única y cómoda para todos los amantes del cine.
              </p>
            </Card.Body>
          </Card>

          <Card className="p-4 shadow-sm card-transparency mb-4"> {/* Aplica la clase personalizada */}
            <Card.Body>
              <h3>¿Por qué elegirnos?</h3>
              <ul>
                <li>Las películas más recientes en cartelera.</li>
                <li>Salas de cine con la última tecnología en sonido y proyección.</li>
                <li>Comodidad garantizada con asientos reclinables y ambiente climatizado.</li>
                <li>Amplia oferta de alimentos y bebidas en nuestra confitería.</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="p-4 shadow-sm card-transparency mb-4"> {/* Aplica la clase personalizada */}
            <Card.Body>
              <h3>Ubicación</h3>
              <p>
                Nos encontramos en una ubicación privilegiada:
                <br />
                <strong>Dirección:</strong> Av. Ballivián, Zona Sur, La Paz, Bolivia
              </p>
            </Card.Body>
          </Card>

          <Card className="p-4 shadow-sm card-transparency mb-4"> {/* Aplica la clase personalizada */}
            <Card.Body>
              <h3>Horarios de Atención</h3>
              <p>
                Estamos abiertos todos los días:
                <br />
                <strong>Lunes a Viernes:</strong> 12:00 PM - 11:00 PM
                <br />
                <strong>Sábados y Domingos:</strong> 10:00 AM - 12:00 AM
              </p>
            </Card.Body>
          </Card>

          <Card className="p-4 shadow-sm card-transparency mb-4"> {/* Aplica la clase personalizada */}
            <Card.Body>
              <h3>Contacto</h3>
              <p>
                Para más información, puedes contactarnos:
                <br />
                <strong>Teléfono:</strong> +591 2 222-3333
                <br />
                <strong>Email:</strong> info@micinebolivia.com
              </p>
            </Card.Body>
          </Card>

          <Card className="p-4 shadow-sm card-transparency"> {/* Aplica la clase personalizada */}
            <Card.Body>
              <h3>Redes Sociales</h3>
              <p>Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades y estrenos:</p>
              <ul>
                <li><strong>Facebook:</strong> facebook.com/micinebolivia</li>
                <li><strong>Instagram:</strong> @micinebolivia</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreNosotros;
