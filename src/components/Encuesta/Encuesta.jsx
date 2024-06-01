import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Preloader from '../Preloader/Preloader'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import './EncuestaCSS.css';
import preguntas from './Preguntas';

const Encuesta = () => {
  const [respuestas, setRespuestas] = useState({});
  const [idEncuesta, setIdEncuesta] = useState(null);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [resultadoEncuesta, setResultadoEncuesta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  useEffect(() => {
    verificarConexionApi();
  }, []);

  const verificarConexionApi = async () => {
    try {
      const response = await axios.get('https://web-production-8f98.up.railway.app/api/encuestas/');
      if (response.status === 200) {
        setApiConnected(true);
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRespuesta = (pregunta, opcionSeleccionada) => {
    setRespuestas({ ...respuestas, [pregunta]: opcionSeleccionada });
  };

  const enviarEncuesta = async () => {
    const url = 'https://web-production-8f98.up.railway.app/api/encuestas/';
    let ec_id = idEncuesta;

    if (!idEncuesta) {
      try {
        const response = await axios.post(url, respuestas);
        ec_id = response.data.usr_id;
        setIdEncuesta(ec_id);
      } catch (error) {
        console.error('Error al crear la encuesta:', error);
      }
    }

    const total = Object.values(respuestas).reduce((acc, curr) => acc + curr, 0);
    const data = { ...respuestas, ec_total: total, usr: ec_id };

    try {
      await axios.put(`${url}/${ec_id}`, data);
      setResultadoEncuesta(total);
    } catch (error) {
      console.error('Error al actualizar la encuesta:', error);
    }
  };

  const avanzarPregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    }
  };

  const retrocederPregunta = () => {
    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1);
    }
  };

  return (
    <div className="encuesta-container">
      <Preloader load={isLoading} />
      {!isLoading && apiConnected && (
        <>
          {preguntaActual < preguntas.length - 1 && preguntas[preguntaActual] && (
            <div className="pregunta">
              <div className="pregunta-numero">
                <span>Pregunta {preguntaActual + 1} de</span> {preguntas.length - 1}
              </div>
              <div className="pregunta-titulo">
                {preguntas[preguntaActual].titulo}
              </div>
              <div className="opciones">
                {preguntas[preguntaActual].opciones.map((opcion, idx) => (
                  <button
                    key={idx}
                    className="opcion-button"
                    onClick={() =>
                      handleRespuesta(
                        `ec_pregunta_${preguntaActual + 1}`,
                        opcion.valor
                      )
                    }
                    style={{
                      backgroundColor:
                        respuestas[`ec_pregunta_${preguntaActual + 1}`] ===
                        opcion.valor
                          ? '#2f922f'
                          : '',
                    }}
                  >
                    {opcion.textoRespuesta}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="navegacion">
            <button
              className="navegacion-button mr-2"
              onClick={retrocederPregunta}
              disabled={preguntaActual === 0}
            >
              Regresar
            </button>
            <button
              className="navegacion-button"
              onClick={avanzarPregunta}
              disabled={preguntaActual === preguntas.length - 1}
            >
              Siguiente
            </button>
            {preguntaActual === preguntas.length - 1 && (
              <button className="navegacion-button" onClick={() => {
                enviarEncuesta();
                window.location.reload();
              }}>
                Enviar
              </button>
            )}
             <div className="footerEncuesta" >
            <p>Desarrollado por Isaac Romero - 2024</p>
          </div>
          </div>
          <div className="resultado-encuesta">
            {resultadoEncuesta !== null && (
              <p>Resultado de la encuesta: {resultadoEncuesta}</p>
            )}
          </div>
         
        </>
      )}
      {!isLoading && !apiConnected && (
        <div className="error-mensaje">
          <p>No se pudo conectar con la API. Por favor, intente de nuevo más tarde.</p>
        </div>
      )}
      
    </div>
  );
};

export default Encuesta;
