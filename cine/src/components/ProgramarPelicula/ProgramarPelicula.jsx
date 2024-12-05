import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProgramarPeliculas = () => {
  const [salasProgramadas, setSalasProgramadas] = useState([]);
  const [tiposProyeccion, setTiposProyeccion] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [selectedSala, setSelectedSala] = useState("");
  const [selectedProyeccion, setSelectedProyeccion] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [selectedPeliculaId, setSelectedPeliculaId] = useState(null);

  // Obtener datos al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró un token. Por favor, inicia sesión.");
      return;
    }

    const decoded = jwtDecode(token);
    setUserRole(decoded.authorities);

    // Obtener las películas desde el backend
    axios
      .get("http://localhost:8080/api/admin/peliculas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPeliculas(response.data))
      .catch((error) => console.error("Error al obtener películas:", error));

    // Obtener las salas programadas
    axios
      .get("http://localhost:8080/api/admin/salas/programadas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setSalasProgramadas(response.data))
      .catch((error) =>
        console.error("Error al obtener salas programadas:", error)
      );

    // Obtener los tipos de proyección
    axios
      .get("http://localhost:8080/api/admin/proyecciones/tipos", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setTiposProyeccion(response.data))
      .catch((error) =>
        console.error("Error al obtener tipos de proyección:", error)
      );
  }, []);

  // Manejar la programación de la película
  const handleProgramar = () => {
    if (
      !selectedSala ||
      !selectedProyeccion ||
      !selectedHorario ||
      !selectedPeliculaId
    ) {
      alert("Por favor, completa todos los campos para programar.");
      return;
    }

    const token = localStorage.getItem("token");
    const body = {
      peliculaId: selectedPeliculaId,
      proyecciones: [
        {
          salaId: selectedSala,
          tipoProyeccionId: selectedProyeccion,
          fechaInicio: "2024-12-01", // Cambia esto si necesitas fechas dinámicas
          fechaFin: "2024-12-07",
          horarios: [selectedHorario],
        },
      ],
    };

    axios
      .post("http://localhost:8080/api/admin/programacion/peliculas", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(`Programación completada: ${response.data.mensaje}`);
        // Reinicia los campos después de programar
        setSelectedPeliculaId(null);
        setSelectedSala("");
        setSelectedProyeccion("");
        setSelectedHorario("");
      })
      .catch((error) => {
        console.error("Error al programar película:", error);
        alert("Hubo un error al programar la película.");
      });
  };

  // Verifica si el usuario es administrador
  if (userRole !== "ROLE_ADMIN") {
    return <p>No tienes permisos para acceder a esta funcionalidad.</p>;
  }

  return (
    <div>
      <h1>Programar Películas</h1>

      {/* Lista de películas */}
      {peliculas.map((pelicula) => (
        <div key={pelicula.id}>
          <h3>{pelicula.titulo}</h3>
          <button onClick={() => setSelectedPeliculaId(pelicula.id)}>
            Programar Función
          </button>
        </div>
      ))}

      {/* Formulario de programación */}
      {selectedPeliculaId && (
        <div>
          <h2>Programar Función para Película {selectedPeliculaId}</h2>

          <label>Sala:</label>
          <select
            value={selectedSala}
            onChange={(e) => setSelectedSala(e.target.value)}
          >
            <option value="">Seleccionar Sala</option>
            {salasProgramadas.map((sala) => (
              <option key={sala.salaId} value={sala.salaId}>
                {sala.nombreSala} - {sala.fechaProyeccion} {sala.horaProyeccion}
              </option>
            ))}
          </select>

          <label>Tipo de Proyección:</label>
          <select
            value={selectedProyeccion}
            onChange={(e) => setSelectedProyeccion(e.target.value)}
          >
            <option value="">Seleccionar Tipo</option>
            {tiposProyeccion.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>

          <label>Horario:</label>
          <input
            type="time"
            value={selectedHorario}
            onChange={(e) => setSelectedHorario(e.target.value)}
          />

          <button onClick={handleProgramar}>Programar</button>
        </div>
      )}
    </div>
  );
};

export default ProgramarPeliculas;
