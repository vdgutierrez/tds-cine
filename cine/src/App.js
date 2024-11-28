import React, { useState } from 'react';
import './App.css';  // Asegúrate de que los estilos estén correctamente importados
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomNavbar from './components/CustomNavbar/CustomNavbar';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage';  // Página principal
import CinemaRoom from './components/Salas/CinemaRoom';  // Sala de cine
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SobreNosotros from './components/SobreNosotros/SobreNosotros';
import CarteleraFiltrada from './components/CarteleraFiltrada/CarteleraFiltrada';
import Detalle from './components/Detalle/Detalle';
import Pago from './components/Pago/Pago';
import Cartelera from './components/Cartelera/Cartelera';

const App = () => {
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]); // Definir asientosSeleccionados
  const [total, setTotal] = useState(0); // Definir total
  const [asientos] = useState([  // Asientos con datos de prueba
    { "fila": "A", "columna": 1, "disponible": true },
    { "fila": "A", "columna": 2, "disponible": false },
    { "fila": "A", "columna": 3, "disponible": true },
    { "fila": "A", "columna": 4, "disponible": true },
    { "fila": "A", "columna": 5, "disponible": true },
    { "fila": "A", "columna": 6, "disponible": false },
    { "fila": "A", "columna": 7, "disponible": true },
    { "fila": "A", "columna": 8, "disponible": true },
    { "fila": "A", "columna": 9, "disponible": true },
    { "fila": "A", "columna": 10, "disponible": true },

    { "fila": "B", "columna": 1, "disponible": true },
    { "fila": "B", "columna": 2, "disponible": true },
    { "fila": "B", "columna": 3, "disponible": false },
    { "fila": "B", "columna": 4, "disponible": true },
    { "fila": "B", "columna": 5, "disponible": true },
    { "fila": "B", "columna": 6, "disponible": true },
    { "fila": "B", "columna": 7, "disponible": true },
    { "fila": "B", "columna": 8, "disponible": false },
    { "fila": "B", "columna": 9, "disponible": true },
    { "fila": "B", "columna": 10, "disponible": true },

    { "fila": "C", "columna": 1, "disponible": true },
    { "fila": "C", "columna": 2, "disponible": true },
    { "fila": "C", "columna": 3, "disponible": true },
    { "fila": "C", "columna": 4, "disponible": false },
    { "fila": "C", "columna": 5, "disponible": true },
    { "fila": "C", "columna": 6, "disponible": true },
    { "fila": "C", "columna": 7, "disponible": true },
    { "fila": "C", "columna": 8, "disponible": true },
    { "fila": "C", "columna": 9, "disponible": true },
    { "fila": "C", "columna": 10, "disponible": true },

    { "fila": "D", "columna": 1, "disponible": true },
    { "fila": "D", "columna": 2, "disponible": false },
    { "fila": "D", "columna": 3, "disponible": true },
    { "fila": "D", "columna": 4, "disponible": true },
    { "fila": "D", "columna": 5, "disponible": true },
    { "fila": "D", "columna": 6, "disponible": true },
    { "fila": "D", "columna": 7, "disponible": false },
    { "fila": "D", "columna": 8, "disponible": true },
    { "fila": "D", "columna": 9, "disponible": true },
    { "fila": "D", "columna": 10, "disponible": true },

    { "fila": "E", "columna": 1, "disponible": true },
    { "fila": "E", "columna": 2, "disponible": true },
    { "fila": "E", "columna": 3, "disponible": true },
    { "fila": "E", "columna": 4, "disponible": false },
    { "fila": "E", "columna": 5, "disponible": true },
    { "fila": "E", "columna": 6, "disponible": true },
    { "fila": "E", "columna": 7, "disponible": true },
    { "fila": "E", "columna": 8, "disponible": false },
    { "fila": "E", "columna": 9, "disponible": true },
    { "fila": "E", "columna": 10, "disponible": true }
  ]);

  const pelicula = {
    titulo: "TERRIFIEfsdgR 3: PAYASO SINIESTRO",
    detalle: "Una película de terror sobre un payaso asesino que acecha en la oscuridad.",
    duracion: "120 minutos"
  };

  const precio = {
    adulto: 50,  // Precio por asiento adulto
    niño: 30    // Precio por asiento niño
  };

  return (
    <div>
      <Router>
        <CustomNavbar />
        <div className="content-background">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cinema-room" element={<CinemaRoom pelicula={pelicula} asientos={asientos} precio={precio} />} />
            <Route path="/cartelera" element={<Cartelera />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/detalle/:id" element={<Detalle />} />
            <Route path="/pago" element={<Pago pelicula={pelicula} asientosSeleccionados={asientosSeleccionados} total={total} />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
