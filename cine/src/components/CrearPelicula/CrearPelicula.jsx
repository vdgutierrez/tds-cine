import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const CrearPelicula = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    director: "",
    descripcion: "",
    duracion: "",
    estudio: "",
    enProyeccion: "true",
    trailer: "",
    genero: "",
    clasificacion: "",
  });

  const [poster, setPoster] = useState(null); // Archivo del póster

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]); // Guardar el archivo seleccionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("película", JSON.stringify(formData)); // Convertir el formulario en JSON
      if (poster) data.append("poster", poster); // Agregar el archivo

      const response = await axios.post("http://localhost:8080/api/peliculas", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("Película creada con éxito");
      navigate("/");
    } catch (error) {
      console.error("Error al crear la película:", error);
      alert("Ocurrió un error al crear la película.");
    }
  };

  return (
    <Container style={{ marginTop: "5%", marginBottom: "5%" }}>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center text-white">Crear Película</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitulo">
              <Form.Label className="text-white">Título</Form.Label>
              <Form.Control
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDirector">
              <Form.Label className="text-white">Director</Form.Label>
              <Form.Control
                type="text"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label className="text-white">Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDuracion">
              <Form.Label className="text-white">Duración (minutos)</Form.Label>
              <Form.Control
                type="number"
                name="duracion"
                value={formData.duracion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEstudio">
              <Form.Label className="text-white">Estudio</Form.Label>
              <Form.Control
                type="text"
                name="estudio"
                value={formData.estudio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEnProyeccion">
              <Form.Label className="text-white">En Proyección</Form.Label>
              <Form.Select
                name="enProyeccion"
                value={formData.enProyeccion}
                onChange={handleChange}
                required
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTrailer">
              <Form.Label className="text-white">Trailer</Form.Label>
              <Form.Control
                type="text"
                name="trailer"
                value={formData.trailer}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGenero">
              <Form.Label className="text-white">Género</Form.Label>
              <Form.Control
                type="text"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formClasificacion">
              <Form.Label className="text-white">Clasificación</Form.Label>
              <Form.Control
                type="text"
                name="clasificacion"
                value={formData.clasificacion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPoster">
              <Form.Label className="text-white">Póster</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Crear Película
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CrearPelicula;