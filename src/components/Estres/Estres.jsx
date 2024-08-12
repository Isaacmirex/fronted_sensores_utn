import React, { useEffect, useState } from "react";
import axios from "axios";
import Preloader from '../Preloader/Preloader'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import './EstresCSS.css'; // Importa el archivo CSS

const Estres = () => {
  const [usr_estres_puntos, setUsrEstresPuntos] = useState(0);
  const [usr_estres_texto, setUsrEstresTexto] = useState('');
  const [ecTotal, setEcTotal] = useState(0);
  const [estresTotal, setEstresTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState('30');
  const [searchID, setSearchID] = useState('30');
  const [mensajeEstres, setMensajeEstres] = useState('');

  const fetchEstresUsuario = async (id) => {
    try {
      const { data } = await axios.get('https://web-production-8f98.up.railway.app/api/usuarios/');
      const usuario = data.find(user => user.usr_id === parseInt(id));
      if (usuario) {
        setUsrEstresPuntos(usuario.usr_estres_puntos);
        setUsrEstresTexto(usuario.usr_estres_texto);
        setMensajeEstres(`Estado del estrés: ${usuario.usr_estres_texto}`);
      } else {
        setUsrEstresPuntos(0);
        setUsrEstresTexto('');
        setMensajeEstres("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error fetching user stress data:", error);
      setUsrEstresPuntos(0);
      setUsrEstresTexto('');
      setMensajeEstres("Error al obtener los datos del usuario");
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
        setMensajeEstres(`Estado del estrés: ${usr_estres_texto}`);
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
      setEcTotal(0);
      setMensajeEstres(`Estado del estrés: ${usr_estres_texto}`);
    }
  };

  const fetchData = async (id) => {
    setIsLoading(true);
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
    if (nivel < 10) return "green";
    if (nivel < 35) return "yellow";
    return "red";
  };

  const calculatePercentage = (value, max) => {
    return (value / max) * 100;
  };

  const stressPercentage = calculatePercentage(ecTotal, 56);
  const estresData = ecTotal;

  useEffect(() => {
    const totalEstres = (usr_estres_puntos + ecTotal) / 2;
    setEstresTotal(totalEstres);
  }, [usr_estres_puntos, ecTotal]);

  const handleSearch = () => {
    setSearchID(userID);
  };

  return (
    <div className="estres-container">
      <Preloader load={isLoading} />
      {!isLoading && (
        <>
          <h1 className="estres-title">Nivel de estrés estudiante</h1>
          <div className="estres-search-container my-4 flex justify-center items-center">
            <input
              type="text"
              placeholder="Ingrese el ID del usuario"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="border border-gray-300 p-2 rounded-md mr-2"
            />
            <button 
              onClick={handleSearch} 
              className="estres-btn-warning"
            >
              Buscar
            </button>
          </div>
          {mensajeEstres && <p className="estres-texto text-center">{mensajeEstres}</p>} {/* Mostrar el mensaje del estado de estrés */}
          <div className="estres-charts-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="estres-chart-wrapper">
              <h2 className="estres-chart-title text-center">Modelo Inteligencia Artificial</h2>
              <div className={`estres-circle-chart ${getColor(usr_estres_puntos)}`} style={{ '--value': usr_estres_puntos }}>
                <div className="estres-circle-content">
                  <span className="estres-circle-value">{usr_estres_puntos}%</span>
                  <span className="estres-circle-label">Estrés</span>
                </div>
              </div>
            </div>
            <div className="estres-chart-wrapper">
              <h2 className="estres-chart-title text-center">Encuesta de estrés percibido</h2>
              <div className={`estres-circle-chart ${getColor(estresData)}`} style={{ '--value': estresData }}>
                <div className="estres-circle-content">
                  <span className="estres-circle-value">{estresData.toFixed(2)}%</span>
                  <span className="estres-circle-label">Estrés</span>
                </div>
              </div>
            </div>
            <div className="estres-chart-wrapper">
              <h2 className="estres-chart-title text-center">Estrés Total</h2>
              <div className={`estres-circle-chart ${getColor(estresTotal)}`} style={{ '--value': estresTotal }}>
                <div className="estres-circle-content">
                  <span className="estres-circle-value">{estresTotal.toFixed(2)}%</span>
                  <span className="estres-circle-label">Estrés</span>
                </div>
              </div>
            </div>
          </div>
          <footer className="estres-text-center mt-4">
            <p>Desarrollado por Isaac Romero - 2024</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Estres;
