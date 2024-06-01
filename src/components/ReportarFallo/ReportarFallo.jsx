import React, { useState } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import "./falloCss.css"; // Importar tu archivo CSS personalizado

const ReportarFallo = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el reporte de error
    console.log("Reporte enviado:", { titulo, descripcion });
    // También podrías enviar estos datos a través de una solicitud HTTP a un servidor
    // Por simplicidad, solo los estamos imprimiendo en la consola
    // Limpiar los campos
    setTitulo("");
    setDescripcion("");
    // Mostrar la alerta
    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: "Gracias por reportar el fallo.",
      confirmButtonColor: "#ffc107", // Color amarillo
      confirmButtonClass: "btn btn-warning", // Botón amarillo con letras negras
    });
  };

  return (
    <div id="fallo-container">
      <div id="fallo-card">
        <div className="card-body">
          <h1 id="fallo-card-title">
            <i className="bi bi-exclamation-triangle-fill text-warning"></i>{" "}
            Reporte de Error
          </h1>
          <form id="fallo-card-form" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="titulo">Título:</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                className="form-control textarea"
                id="descripcion"
                rows="4"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="btn-warning">
                <i className="bi bi-arrow-right"></i> Enviar Reporte
              </button>
            </div>
          </form>
          <footer>
            <p>Desarrollado por Isaac Romero - 2024</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ReportarFallo;
