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
          <h1 className="text-lg font-bold mb-4">Manual de Usuario de la Plataforma de Medición de Estrés</h1>
          <h2 className="text-base font-bold mb-2">Introducción</h2>
          <p className="text-sm mb-4">La Plataforma de Medición de Estrés es una herramienta integral diseñada para recopilar datos relacionados con el estrés percibido y las variables fisiológicas de los pacientes. Este manual proporciona instrucciones detalladas sobre cómo utilizar la plataforma de manera efectiva para obtener información valiosa sobre el estrés.</p>
          <h2 className="text-base font-bold mb-2">Procedimiento</h2>
          <ol className="list-decimal pl-4 mb-8">
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Ingreso de Datos del Paciente:</h3>
              <ul className="list-disc pl-4">
                <li>Ingrese a la plataforma general</li>
                <li>Complete los datos del paciente, incluyendo nombre, edad, género y cualquier información relevante adicional.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Medición del Estrés Percibido (PSS14):</h3>
              <p>Utilice la prueba de Estrés Percibido dentro de la plataforma para evaluar el nivel de estrés percibido del paciente.</p>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Medición de Variables Fisiológicas:</h3>
              <ul className="list-disc pl-4">
                <li>Conecte el dispositivo de hardware y acceda al menú correspondiente en la plataforma.</li>
                <li>Seleccione el sensor que desea utilizar para medir las variables fisiológicas, como la frecuencia respiratoria, el ritmo cardíaco, la tensión muscular o la temperatura corporal.</li>
                <li>Realice las mediciones según las instrucciones proporcionadas.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Visualización del Estrés:</h3>
              <p>Una vez completadas todas las mediciones, la plataforma mostrará el nivel de estrés del paciente basado en un modelo entrenado por inteligencia artificial. Analice y comprenda los resultados presentados en la plataforma.</p>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Reporte de Fallos:</h3>
              <ul className="list-disc pl-4">
                <li>En caso de encontrar algún fallo, utilice la opción de reporte dentro de la plataforma.</li>
                <li>Ingrese un título descriptivo y detalle el problema encontrado para su pronta resolución.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Dashboard por Paciente:</h3>
              <p>Acceda al panel de control individual de cada paciente para visualizar estadísticas detalladas sobre su nivel de estrés y otras mediciones fisiológicas.</p>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Estadísticas Globales:</h3>
              <p>Consulte las estadísticas globales por facultades de la universidad para obtener una visión general del estrés entre los estudiantes.</p>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Acerca del Autor:</h3>
              <p>Conozca más sobre el autor de la plataforma, Isaac Romero, quien creó esta herramienta para contribuir al estudio y manejo del estrés en el ámbito universitario.</p>
            </li>
          </ol>
        </div>
      );
    } else if (currentPage === 2) {
      return (
        <div>
          <h1 className="text-lg font-bold mb-4">Manual de Usuario del Dispositivo de Hardware</h1>
          <h2 className="text-base font-bold mb-2">Introducción</h2>
          <p className="text-sm mb-4">El Dispositivo de Hardware es una parte integral de la Plataforma de Medición de Estrés, diseñado para medir variables fisiológicas como la frecuencia respiratoria, el ritmo cardíaco, la tensión muscular y la temperatura corporal. Este manual proporciona instrucciones detalladas sobre cómo utilizar el dispositivo de manera efectiva para obtener mediciones precisas.</p>
          <h2 className="text-base font-bold mb-2">Procedimiento</h2>
          <ol className="list-decimal pl-4 mb-8">
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Conexión del Dispositivo:</h3>
              <ul className="list-disc pl-4">
                <li>Conecte el dispositivo de hardware a un puerto USB disponible en su computadora.</li>
                <li>Espere a que el dispositivo sea detectado y configurado correctamente por la plataforma.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Acceso al Menú:</h3>
              <ul className="list-disc pl-4">
                <li>Una vez conectado, acceda al menú del dispositivo desde la plataforma.</li>
                <li>Seleccione la opción correspondiente al sensor que desea utilizar para realizar mediciones.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Selección del Sensor:</h3>
              <ul className="list-disc pl-4">
                <li>Dentro del menú, elija el sensor que desea utilizar para medir una variable fisiológica específica.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Realización de Mediciones:</h3>
              <ul className="list-disc pl-4">
                <li>Siga las instrucciones en pantalla para realizar mediciones precisas utilizando el sensor seleccionado.</li>
                <li>Asegúrese de colocar correctamente el sensor según las indicaciones proporcionadas.</li>
              </ul>
            </li>
            <li className="mb-4">
              <h3 className="text-sm font-bold mb-2">Finalización y Retorno a la Plataforma:</h3>
              <ul className="list-disc pl-4">
                <li>Una vez completadas las mediciones, cierre el menú del dispositivo y regrese a la plataforma.</li>
                <li>Los datos medidos se enviarán automáticamente a la plataforma para su análisis.</li>
              </ul>
            </li>
          </ol>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      {renderContent()}
      {currentPage !== 1 && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2" onClick={prevPage}>Atrás</button>
      )}
      {currentPage !== 2 && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={nextPage}>Siguiente</button>
      )}
    </div>
  );
};

export default ManualUsuario;
