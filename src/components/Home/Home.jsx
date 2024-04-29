/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css"; // Importa tu archivo CSS de estilos

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <h1>Detector de Estrés con Inteligencia Artificial</h1>
      </header>
      <section className="content">
        <p>
          El detector de estrés es una aplicación web que utiliza un dispositivo hardware para recolectar datos biométricos de los usuarios. Estos datos se procesan mediante un modelo de inteligencia artificial, que luego proporciona un porcentaje de estrés para cada paciente. Los resultados se presentan en un dashboard que ofrece una visión general del estrés en la universidad, clasificando los datos por facultades con el fin de mitigar el problema.
        </p>
      </section>
      <footer>
        <p>Desarrollado por Isaac Romero - 2024</p>
      </footer>
    </div>
  );
};

export default Home;
