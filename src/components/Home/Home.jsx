import React from "react";
import "./styles.css"; // Importa tu archivo CSS de estilos

const Home = () => {
  return (
    <div className="home-container">
      <section className="content">
        <header style={{ opacity: 0.7 }}> {/* Aplicamos la misma opacidad al encabezado */}
          <h1 className="title">Detector de Estrés con Inteligencia Artificial</h1>
        </header>
        <p className="text">
          El detector de estrés es una aplicación web que utiliza un dispositivo hardware para recolectar datos biométricos de los usuarios. Estos datos se procesan mediante un modelo de inteligencia artificial, que luego proporciona un porcentaje de estrés para cada paciente. Los resultados se presentan en un dashboard que ofrece una visión general del estrés en la universidad, clasificando los datos por facultades con el fin de mitigar el problema.
        </p>
        <div className="image-container">
          <img src="https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D" alt="Imagen 1" className="image" />
          <img src="https://images.unsplash.com/photo-1494459158735-82f8feb14abb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVzdHJlc3N8ZW58MHx8MHx8fDA%3D%3D" alt="Imagen 2" className="image" />
          <img src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXN0cmVzc3xlbnwwfHwwfHx8MA%3D%3D" alt="Imagen 3" className="image" />
        </div>
      </section>
      <footer>
        <p>Desarrollado por Isaac Romero - 2024</p>
      </footer>
    </div>
  );
};

export default Home;
