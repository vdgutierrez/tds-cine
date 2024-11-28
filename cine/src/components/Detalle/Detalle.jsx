import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Detalle = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const navigate = useNavigate();
  
  const [pelicula, setPelicula] = useState(null);
  const [formatoSeleccionado, setFormatoSeleccionado] = useState("3D"); // Definir un formato por defecto
  const [fechaSeleccionada, setFechaSeleccionada] = useState(""); // Establecer la fecha por defecto como vacía
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  useEffect(() => {
    // Datos estáticos de prueba mientras la API no está disponible
    const datosDePrueba = {
      "id": 3,
      "titulo": "Pulp Fiction",
      "genero": "Crimen/Drama",
      "duracion": 154,
      "clasificacion": "R (Mayores de 18)",
      "poster": "https://storage.googleapis.com/siscine.appspot.com/https%3A//ejemplo.com/pulpfiction.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-kc1xl%40siscine.iam.gserviceaccount.com%2F20241128%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20241128T033535Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=16039f4e4c43e50be6cfcd7196ff03966e779206a44e5e08a55d962102079f1324ce9c8a7c40602d86d2b6a6323711b47bbab23e7681514bbe19d0f65a99d0d5fec24bb2f57b82209c29799b02252094cc75d1fe163b459d674a67d2431da984091c546ea2a3be4904b817c581e65a766c9ceef0aa50ad18b366f7eed011201081d863483676af8f42adf0590910c2117cdddb8d9467b0522a1226fa958732014fd1e68b462fe3abcc2a98d810c3377c2bb7e27ac100c3567e1e6a4d7435f1ca00aeadb5b9e794d093fdd776f9a003d1053eba6b3f72683275e9f8cf3374007a827e431c2ad82df33a03111f46a90dde55e4f17012f0280fc76958694ddf7815",
      "trailer": "https://ejemplo.com/pulpfiction-trailer.mp4",
      "esEstreno": true,
      "formatos": [
        { "nombre": "2D", "activo": false },
        { "nombre": "3D", "activo": true }
      ],
      "formatoSeleccionado": "3D",
      "fechasDisponibles": [
        { "fecha": "2024-11-27", "nombreDia": "miércoles", "numeroDia": "27", "nombreMes": "nov", "activo": true },
        { "fecha": "2024-11-28", "nombreDia": "jueves", "numeroDia": "28", "nombreMes": "nov", "activo": false },
        { "fecha": "2024-11-29", "nombreDia": "viernes", "numeroDia": "29", "nombreMes": "nov", "activo": false }
      ],
      "fechaSeleccionada": "2024-11-27",
      "horarios": [
        { "proyeccionId": 31, "hora": "16:00:00", "asientosDisponibles": 24, "disponible": true, "salaNombre": "Sala VIP", "tipoSala": "VIP" },
        { "proyeccionId": 39, "hora": "19:00:00", "asientosDisponibles": 24, "disponible": true, "salaNombre": "Sala VIP", "tipoSala": "VIP" },
        { "proyeccionId": 63, "hora": "20:00:00", "asientosDisponibles": 24, "disponible": true, "salaNombre": "Sala VIP", "tipoSala": "VIP" }
      ]
    };

    // Simulamos la carga de la película con los datos de prueba
    setPelicula(datosDePrueba);

    // Si la API estuviera disponible, haríamos lo siguiente:
    // const fetchPelicula = async () => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:8080/api/peliculas/${id}/sesiones?fecha=${fechaSeleccionada || ""}&formato=${formatoSeleccionado}`
    //     );
    //     const data = await response.json();
    //     setPelicula(data);
    //     setFechaSeleccionada(data.fechaSeleccionada); // Establecer fecha seleccionada si es necesario
    //   } catch (error) {
    //     console.error("Error al cargar la película:", error);
    //   }
    // };

    // fetchPelicula(); // Llamada a la API
  }, [id, fechaSeleccionada, formatoSeleccionado]);

  if (!pelicula) {
    return <h1 className="text-center text-white">Cargando detalles...</h1>;
  }

  const handleContinue = () => {
    navigate("/seleccion-butacas");
  };

  return (
    <div className="d-flex justify-content-center" style={{ padding: "5%" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center text-white">{pelicula.titulo}</h1>
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
                <h5 className="text-white">Detalles de la película</h5>
                <p><strong>Género:</strong> {pelicula.genero}</p>
                <p><strong>Duración:</strong> {pelicula.duracion} min.</p>
                <p><strong>Clasificación:</strong> {pelicula.clasificacion}</p>
              </Card.Body>
            </Card>

            {/* Sinopsis */}
            <Card className="mb-3">
              <Card.Body>
                <h5 className="text-white">Sinopsis</h5>
                <p>{pelicula.descripcion}</p>
              </Card.Body>
            </Card>

            {/* Selección de Fecha */}
            <h4 className="text-white text-center">Seleccionar Fecha</h4>
            <div className="d-flex justify-content-center flex-wrap">
              {pelicula.fechasDisponibles
                .filter((fecha) => fecha.activo)
                .map((fecha, index) => (
                  <Button
                    key={index}
                    variant={fechaSeleccionada === fecha.fecha ? "primary" : "outline-light"}
                    onClick={() => setFechaSeleccionada(fecha.fecha)}
                    className="m-1"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '100px',
                    }}
                  >
                    <div style={{ textTransform: 'capitalize' }}>{fecha.nombreDia}</div>
                    <div style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{fecha.numeroDia}</div>
                    <div>{fecha.nombreMes}</div>
                  </Button>
                ))}
            </div>

            {/* Selección de Formato */}
            <h4 className="mt-3 text-white text-center">Seleccionar Formato</h4>
            <div className="d-flex justify-content-center flex-wrap">
              {pelicula.formatos.map((formato, index) => (
                <Button
                  key={index}
                  variant={formatoSeleccionado === formato.nombre ? "primary" : "outline-light"}
                  onClick={() => setFormatoSeleccionado(formato.nombre)}
                  className="m-1"
                >
                  {formato.nombre}
                </Button>
              ))}
            </div>

            {/* Selección de Horario */}
            <h4 className="mt-3 text-white text-center">Seleccionar Horario</h4>
            <div className="d-flex justify-content-center flex-wrap">
              {fechaSeleccionada &&
                pelicula.horarios
                  .filter((horario) => horario.fecha === fechaSeleccionada && horario.disponible)
                  .map((horario, index) => (
                    <Button
                      key={index}
                      variant={horarioSeleccionado === horario.hora ? "primary" : "outline-light"}
                      onClick={() => setHorarioSeleccionado(horario.hora)}
                      className="m-1"
                    >
                      {horario.hora}
                    </Button>
                  ))}
            </div>

            {/* Continuar */}
            <div className="text-center mt-4">
              <Button
                variant="primary" // Azul
                onClick={handleContinue}
                disabled={!horarioSeleccionado || !formatoSeleccionado || !fechaSeleccionada}
              >
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
