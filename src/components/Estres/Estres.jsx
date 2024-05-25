import React, { useEffect, useState } from "react";
import axios from "axios";
import Preloader from '../Preloader/Preloader'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import './EstresCSS.css'; // Importa el archivo CSS

const Estres = () => {
  const [estresUsuario, setEstresUsuario] = useState(0);
  const [ecTotal, setEcTotal] = useState(0);
  const [estresTotal, setEstresTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEstresUsuario = async () => {
      try {
        const { data } = await axios.get('https://web-production-8f98.up.railway.app/api/usuarios/');
        const ultimoUsuario = data.sort((a, b) => b.usr_id - a.usr_id)[0];
        setEstresUsuario(ultimoUsuario.usr_estres);
      } catch (error) {
        console.error("Error fetching user stress data:", error);
      }
    };
    const fetchEncuesta = async () => {
      try {
        const { data } = await axios.get('https://web-production-8f98.up.railway.app/api/encuestas/');
        const ultimaEncuesta = data.sort((a, b) => b.ec_id - a.ec_id)[0];
        setEcTotal(ultimaEncuesta.ec_total);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    const fetchData = async () => {
      await fetchEstresUsuario();
      await fetchEncuesta();
      setIsLoading(false); // Datos cargados, desactivar preloader
    };

    fetchData();
  }, []);

  const getColor = (nivel) => {
    if (nivel < 30) return "green";
    if (nivel < 60) return "yellow";
    return "red";
  };

  const calculatePercentage = (value, max) => {
    return (value / max) * 100;
  };

  const stressPercentage = calculatePercentage(ecTotal, 56);

  useEffect(() => {
    const totalEstres = (estresUsuario + stressPercentage) / 2;
    setEstresTotal(totalEstres);
  }, [estresUsuario, stressPercentage]);

  return (
    <div className="container">
      <Preloader load={isLoading} />
      {!isLoading && (
        <>
          <h1 className="title">Nivel de estrés estudiante</h1>
          <div className="charts-container">
            <div className="chart-wrapper">
              <h2 className="chart-title">Sensores biométricos</h2>
              <div className={`circle-chart ${getColor(estresUsuario)}`} style={{ '--value': estresUsuario }}>
                <div className="circle-content">
                  <span className="circle-value">{estresUsuario}%</span>
                  <span className="circle-label">Estrés</span>
                </div>
              </div>
            </div>
            <div className="chart-wrapper">
              <h2 className="chart-title">Encuesta de estrés percibido</h2>
              <div className={`circle-chart ${getColor(stressPercentage)}`} style={{ '--value': stressPercentage }}>
                <div className="circle-content">
                  <span className="circle-value">{stressPercentage.toFixed(2)}%</span>
                  <span className="circle-label">Estrés</span>
                </div>
              </div>
            </div>
            <div className="chart-wrapper">
              <h2 className="chart-title">Estrés Total</h2>
              <div className={`circle-chart ${getColor(estresTotal)}`} style={{ '--value': estresTotal }}>
                <div className="circle-content">
                  <span className="circle-value">{estresTotal.toFixed(2)}%</span>
                  <span className="circle-label">Estrés</span>
                </div>
              </div>
            </div>
          </div>
          <footer>
            <p>Desarrollado por Isaac Romero - 2024</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Estres;
