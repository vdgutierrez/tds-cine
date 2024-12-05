import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


const ProgramarPeliculas = () => {
  const [salasProgramadas, setSalasProgramadas] = useState([]);
  const [tiposProyeccion, setTiposProyeccion] = useState([]);
  const [peliculas, setPeliculas] = useState([]); // Supongamos que tienes una lista de películas
  const [userRole, setUserRole] = useState(null);
  const [selectedSala, setSelectedSala] = useState("");
  const [selectedProyeccion, setSelectedProyeccion] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [selectedPeliculaId, setSelectedPeliculaId] = useState(null);

  useEffect(() => {
    // Obtener el rol del usuario desde el token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.authorities);
    }

    // Obtener las salas programadas
    axios
      .get("http://localhost:8080/api/admin/salas/programadas")
      .then((response) => setSalasProgramadas(response.data))
      .catch((error) => console.error("Error al obtener salas:", error));

    // Obtener los tipos de proyección
    axios
      .get("http://localhost:8080/api/admin/proyecciones/tipos")
      .then((response) => setTiposProyeccion(response.data))
      .catch((error) => console.error("Error al obtener tipos de proyección:", error));

    // Simulación: Lista de películas
    setPeliculas([
      { id: 1, titulo: "Película 1" },
      { id: 2, titulo: "Película 2" },
    ]);
  }, []);

  const handleProgramar = () => {
    if (!selectedSala || !selectedProyeccion || !selectedHorario || !selectedPeliculaId) {
      alert("Por favor, selecciona todos los campos antes de programar.");
      return;
    }

    const body = {
      peliculaId: selectedPeliculaId,
      proyecciones: [
        {
          salaId: selectedSala,
          tipoProyeccionId: selectedProyeccion,
          fechaInicio: "2024-12-01", // Puedes agregar un picker de fecha
          fechaFin: "2024-12-07",
          horarios: [selectedHorario],
        },
      ],
    };

    axios
      .post("http://localhost:8080/api/admin/programacion/peliculas", body)
      .then((response) => {
        alert("Programación completada: " + response.data.mensaje);
      })
      .catch((error) => {
        console.error("Error al programar película:", error);
        alert("Hubo un error al programar la película.");
      });
  };

  if (userRole !== "ROLE_ADMIN") {
    return <p>No tienes permisos para acceder a esta funcionalidad.</p>;
  }

  return (
    <div>
      <h1>Programar Películas</h1>

      {peliculas.map((pelicula) => (
        <div key={pelicula.id}>
          <h3>{pelicula.titulo}</h3>
          <button onClick={() => setSelectedPeliculaId(pelicula.id)}>
            Programar Función
          </button>
        </div>
      ))}

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
            <option value="">Seleccionar Tipo de Proyección</option>
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
