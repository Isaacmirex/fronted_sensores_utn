import React, { useEffect, useState } from "react";
import axios from "axios";
import Preloader from '../Preloader/Preloader'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import './EstresCSS.css'; // Importa el archivo CSS

const Estres = () => {
  const [estresUsuario, setEstresUsuario] = useState(0);
  const [ecTotal, setEcTotal] = useState(0);
  const [estresTotal, setEstresTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState('30');
  const [searchID, setSearchID] = useState('30');
  const [error, setError] = useState(null);

  const fetchEstresUsuario = async (id) => {
    try {
      const { data } = await axios.get('https://web-production-8f98.up.railway.app/api/usuarios/');
      const usuario = data.find(user => user.usr_id === parseInt(id));
      if (usuario) {
        setEstresUsuario(usuario.usr_estres);
      } else {
        setEstresUsuario(0);
        setError("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error fetching user stress data:", error);
      setError("Error fetching user stress data: " + error.message);
      setEstresUsuario(0);
    }
  };

  const fetchEncuesta = async (id) => {
    try {
      const { data } = await axios.get('https://web-production-8f98.up.railway.app/api/encuestas/');
      const encuestasUsuario = data.filter(encuesta => encuesta.usr === parseInt(id));
      if (encuestasUsuario.length > 0) {
        const ultimaEncuesta = encuestasUsuario.sort((a, b) => b.ec_id - a.ec_id)[0];
        setEcTotal(ultimaEncuesta.ec_total);
      } else {
        setEcTotal(0);
        setError("Datos no encontrados");
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
      setError("Error fetching survey data: " + error.message);
      setEcTotal(0);
    }
  };

  const fetchData = async (id) => {
    setIsLoading(true);
    setError(null);
    await fetchEstresUsuario(id);
    await fetchEncuesta(id);
    setIsLoading(false); // Datos cargados, desactivar preloader
  };

  useEffect(() => {
    if (searchID !== null) {
      fetchData(searchID);
    } else {
      setIsLoading(false); // Desactivar preloader si no hay búsqueda
    }
  }, [searchID]);

  const getColor = (nivel) => {
    if (nivel < 30) return "green";
    if (nivel < 60) return "yellow";
    return "red";
  };

  const calculatePercentage = (value, max) => {
    return (value / max) * 100;
  };

  const stressPercentage = calculatePercentage(ecTotal, 56);
  const estresData = ecTotal;

  useEffect(() => {
    const totalEstres = (estresUsuario + ecTotal) / 2;
    setEstresTotal(totalEstres);
  }, [estresUsuario, ecTotal]);

  const handleSearch = () => {
    setSearchID(userID);
  };

  return (
    <div className="container">
      <Preloader load={isLoading} />
      {!isLoading && (
        <>
          <h1 className="title">Nivel de estrés estudiante</h1>
          <div className="search-container my-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Ingrese el ID del usuario"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mr-2"
            />
            <button 
              onClick={handleSearch} 
              className="btn-warning"
            >
              Buscar
            </button>
          </div>
          {error && <p className="error-message text-red-500">{error}</p>}
          <div className="charts-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="chart-wrapper">
              <h2 className="chart-title text-center">Modelo Inteligencia Artificial</h2>
              <div className={`circle-chart ${getColor(estresUsuario)}`} style={{ '--value': estresUsuario }}>
                <div className="circle-content">
                  <span className="circle-value">{estresUsuario}%</span>
                  <span className="circle-label">Estrés</span>
                </div>
              </div>
            </div>
            <div className="chart-wrapper">
              <h2 className="chart-title text-center">Encuesta de estrés percibido</h2>
              <div className={`circle-chart ${getColor(estresData)}`} style={{ '--value': estresData }}>
                <div className="circle-content">
                  <span className="circle-value">{estresData.toFixed(2)}%</span>
                  <span className="circle-label">Estrés</span>
                </div>
              </div>
            </div>
            <div className="chart-wrapper">
              <h2 className="chart-title text-center">Estrés Total</h2>
              <div className={`circle-chart ${getColor(estresTotal)}`} style={{ '--value': estresTotal }}>
                <div className="circle-content">
                  <span className="circle-value">{estresTotal.toFixed(2)}%</span>
                  <span className="circle-label">Estrés</span>
                </div>
              </div>
            </div>
          </div>
          <footer className="text-center mt-4">
            <p>Desarrollado por Isaac Romero - 2024</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Estres;
