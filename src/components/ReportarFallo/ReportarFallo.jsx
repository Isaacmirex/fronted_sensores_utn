import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Importar estilos de Bootstrap
import Swal from 'sweetalert2'; // Importar SweetAlert2

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
      icon: 'success',
      title: 'Mensaje enviado',
      text: 'Gracias por reportar el fallo.',
      confirmButtonColor: '#ffc107', // Color amarillo
      confirmButtonClass: 'btn btn-warning', // Botón amarillo con letras negras
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card bg-dark text-white" style={{ backgroundColor: "#15297c" }}>
            <div className="card-body">
              <h1 className="card-title text-center">
                <i className="bi bi-exclamation-triangle-fill text-warning"></i>{" "}
                Reporte de Error
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-warning">
                    <i className="bi bi-arrow-right"></i> Enviar Reporte
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportarFallo;
