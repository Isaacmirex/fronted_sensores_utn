import React, { useState } from 'react';

const ManualUsuario = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const renderContent = () => {
    if (currentPage === 1) {
      return (
        <div>
          <h1 className="text-lg font-bold mb-2">Manual de Usuario de la Plataforma de Medición de Estrés</h1>
          <div className="page-content">
            <h2 className="text-base font-bold mb-1">Introducción</h2>
            <p className="text-xs mb-2">La Plataforma de Medición de Estrés es una herramienta integral diseñada para recopilar datos relacionados con el estrés percibido y las variables fisiológicas de los pacientes. Este manual proporciona instrucciones detalladas sobre cómo utilizar la plataforma de manera efectiva para obtener información valiosa sobre el estrés.</p>
            <h2 className="text-base font-bold mb-1">Procedimiento</h2>
            <ol className="list-decimal pl-2 mb-4">
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Ingreso de Datos del Paciente:</h3>
                <ul className="list-disc pl-2">
                  <li>Ingrese a la plataforma general</li>
                  <li>Complete los datos del paciente, incluyendo nombre, edad, género y cualquier información relevante adicional.</li>
                </ul>
              </li>
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Medición del Estrés Percibido (PSS14):</h3>
                <p className="text-xs mb-1">Utilice la prueba de Estrés Percibido dentro de la plataforma para evaluar el nivel de estrés percibido del paciente.</p>
              </li>
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Medición de Variables Fisiológicas:</h3>
                <ul className="list-disc pl-2">
                  <li>Conecte el dispositivo de hardware y acceda al menú correspondiente en la plataforma.</li>
                  <li>Se visualizará los datos de los sensores que se  utilizó para medir las variables fisiológicas, como la frecuencia respiratoria, el ritmo cardíaco, la tensión muscular, la temperatura corporal.</li>
                  <li>Revise las mediciones según las instrucciones proporcionadas.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      );
    } else if (currentPage === 2) {
      return (
        <div>
          <h1 className="text-lg font-bold mb-2">Manual de Usuario del Dispositivo de Hardware</h1>
          <div className="page-content">
            <h2 className="text-base font-bold mb-1">Introducción</h2>
            <p className="text-xs mb-2">El Dispositivo de Hardware es una parte integral de la Plataforma de Medición de Estrés, diseñado para medir variables fisiológicas como la frecuencia respiratoria, el ritmo cardíaco, la tensión muscular y la temperatura corporal. Este manual proporciona instrucciones detalladas sobre cómo utilizar el dispositivo de manera efectiva para obtener mediciones precisas.</p>
            <h2 className="text-base font-bold mb-1">Procedimiento</h2>
            <ol className="list-decimal pl-2 mb-4">
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Conexión del Dispositivo:</h3>
                <ul className="list-disc pl-2">
                  <li>Encienta del dispositivo con el switch en el lateral izquierdo</li>
                  <li>Espere a que el dispositivo se conecte al wifi.</li>
                </ul>
              </li>
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Acceso al Menú:</h3>
                <ul className="list-disc pl-2">
                  <li>Una vez conectado, acceda al menú del dispositivo.</li>
                  <li>Seleccione la opción correspondiente al sensor que desea utilizar para realizar mediciones.</li>
                </ul>
              </li>
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Selección del Sensor:</h3>
                <ul className="list-disc pl-2">
                  <li>Dentro del menú, elija el sensor que desea utilizar para medir una variable fisiológica específica.</li>
                </ul>
              </li>
              <li className="mb-2">
                <h3 className="text-xs font-bold mb-1">Realización de Mediciones:</h3>
                <ul className="list-disc pl-2">
                  <li>Asegúrese de seguir las instrucciones pertinentes a las normas de salud de toma de datos.</li>
                  <li>Asegúrese de colocar correctamente el sensor según las indicaciones proporcionadas.</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      {renderContent()}
      <div className="page-buttons">
        {currentPage !== 1 && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mr-2" onClick={prevPage}>Atrás</button>
        )}
        {currentPage !== 2 && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={nextPage}>Siguiente</button>
        )}
      </div>
    </div>
  );
};

export default ManualUsuario;
